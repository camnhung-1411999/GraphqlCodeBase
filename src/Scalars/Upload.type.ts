import { Stream } from 'stream';

export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

// import { GraphQLError, GraphQLScalarType } from 'graphql';
// import { FileUpload } from 'graphql-upload';
// import FileType from 'file-type';
// import { isUndefined } from 'lodash';

// export const UploadScalar = new GraphQLScalarType({
//   name: 'Upload',
//   description: 'File upload scalar type',
//   async parseValue(value: Promise<any>) {
//     // return new ObjectId(value);
//     console.log(value);

//     const upload = await value;
//     const stream = upload.createReadStream();
//     const fileType = await FileType.fromStream(stream);

//     if (isUndefined(fileType)) throw new GraphQLError('Mime type is unknown.');

//     if (fileType?.mime !== upload.mimetype) throw new GraphQLError('Mime type does not match file content.');

//     return upload; // value from the client input variables
//   },
// });
