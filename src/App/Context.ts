import { Request, Response } from 'express';
import { Logger } from 'pino';
import passport from 'passport';
import logger from './Log';
import { IUser } from '../Modules/User/service/user.model';
// import { CustomerResponse } from '../Modules/Customer/Customer/proto/customer_pb';
import { AWSS3Uploader } from './AWS';
import { s3UploadConfig } from './Config';
import EventsBus from '../Services/eventsBus';

export interface IContext {
  req: Request;
  res: Response;
  authenticate?: any;
  authenCustomer?: any;
  user: IUser;
  // customer: CustomerResponse;
  logger: Logger;
  s3Uploader: AWSS3Uploader;
  eventsBus: EventsBus;
  pushNotification: {
    title: string;
    body: string;
    sound: string | 'default';
  };
}

export const Context = {
  logger,
  authenticate: (name: string, options: any, req: Request, res: Response) => new Promise((resolve, reject) => {
    const done = (error: Error, user: IUser, info: any) => {
      if (error) reject(error);
      else resolve({ user, info });
    };
    const auth = passport.authenticate(name, options, done);

    return auth(req, res);
  }),
  // authenCustomer: (name: string, options: any, req: Request, res: Response) => new Promise((resolve, reject) => {
  //   const done = (error: Error, customer: CustomerResponse, info: any) => {
  //     if (error) reject(error);
  //     else resolve({ customer, info });
  //   };
  //   const authen = passport.authenticate(name, options, done);
  //   return authen(req, res);
  // }),
  s3Uploader: new AWSS3Uploader({
    accessKeyId: s3UploadConfig.accessKeyId,
    secretAccessKey: s3UploadConfig.secretAccessKey,
    destinationBucketName: s3UploadConfig.destinationBucketName,
    region: s3UploadConfig.region,
  }),
};
