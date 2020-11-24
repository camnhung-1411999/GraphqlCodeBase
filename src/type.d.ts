// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as express from 'express';

declare module 'graphql-upload';

declare global {
  namespace Express {
    interface Request {
      context: any;
    }
  }
}
