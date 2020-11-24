/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AWS from 'aws-sdk';
import { File } from 'aws-sdk/clients/codecommit';
import stream from 'stream';

type S3UploadConfig = {
  accessKeyId: string;
  secretAccessKey: string;
  destinationBucketName: string;
  region?: string;
};

export type UploadedFileResponse = {
  filename: string;
  mimetype: string;
  encoding: string;
  url: string;
};

export interface IUploader {
  FileUploadResolver: (
    { file }: { file: Promise<File> }
  ) => Promise<UploadedFileResponse>;
}

type S3UploadStream = {
  writeStream: stream.PassThrough;
  promise: Promise<AWS.S3.ManagedUpload.SendData>;
};

export class AWSS3Uploader {
  private s3: AWS.S3;

  public config: S3UploadConfig;

  constructor(config: S3UploadConfig) {
    AWS.config = new AWS.Config();
    AWS.config.update({
      region: config.region || 'ca-central-1',
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    });

    this.s3 = new AWS.S3();
    this.config = config;
  }

  private createDestinationFilePath(
    fileName: string,
    mimetype: string,
    encoding: string
  ): string {
    return fileName;
  }

  private createUploadStream(path: string, key: string): S3UploadStream {
    const pass = new stream.PassThrough();
    return {
      writeStream: pass,
      promise: this.s3
        .upload({
          Bucket: `${this.config.destinationBucketName}/${path}`,
          Key: key,
          Body: pass,
        })
        .promise(),
    };
  }

  async fileUploadResolver(
    path: string,
    file: File | null
  ): Promise<UploadedFileResponse> {
    // Todo next!
    const {
      createReadStream, filename, mimetype, encoding,
    }: any = await file;

    // Create the destination file path
    const filePath = this.createDestinationFilePath(
      filename,
      mimetype,
      encoding
    );

    // Create an upload stream that goes to S3
    const uploadStream = this.createUploadStream(path, filePath);
    createReadStream().pipe(uploadStream.writeStream);

    const result = await uploadStream.promise;
    const link = result.Location;
    return {
      filename, mimetype, encoding, url: result.Location,
    };
  }
}
