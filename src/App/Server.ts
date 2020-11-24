import 'reflect-metadata';
import path from 'path';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'type-graphql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ObjectId } from 'mongodb';
import passport from 'passport';
import { graphqlUploadExpress } from 'graphql-upload';
import { graphqlConfig } from './Config';
import logger from './Log';
import { Playground } from './Playground';
import { Context } from './Context';
import { LogAccessMiddleware } from '../Middlewares/logAccess.middleware';
import { AuthenticationMiddleware } from '../Middlewares/authentication.middleware';
import { AuthenCutomerMiddleware } from '../Middlewares/authenCustomer.middleware';
import ServiceRegistry from '../Services/resgistry';
import { ObjectIdScalar } from '../Scalars/ObjectId.scalars';
import { ErrorMiddleware } from '../Middlewares/error.middleware';
import { ValidationMiddleware } from '../Middlewares/validation.middleware';
import { HookMiddleware } from '../Middlewares/hook.middleware';
import Jwt from './Jwt';
import Database from '../Utils/db';

import HooksRegistry from '../Hooks/hooks-registry';

class Server {
  private App: express.Application;

  private Schema: any;

  private db: any;

  private serviceRegistry: ServiceRegistry;

  constructor() {
    this.App = express();
    this.db = new Database();
    this.serviceRegistry = new ServiceRegistry(logger);
    const hooksRegistry = new HooksRegistry(this.serviceRegistry, logger);
    hooksRegistry.init();
  }

  async getSchema() {
    const schema = await buildSchema({
      resolvers: [
        path.resolve(__dirname, '../Modules/**/*.resolver.{ts,js}'),
        path.resolve(__dirname, '../Modules/**/**/*.resolver.{ts,js}')],
      globalMiddlewares:
        [ErrorMiddleware, AuthenticationMiddleware, AuthenCutomerMiddleware, LogAccessMiddleware, ValidationMiddleware, HookMiddleware],
      scalarsMap: [
        { type: ObjectId, scalar: ObjectIdScalar },
      ],
    });
    logger.info('Create Schema');
    this.Schema = schema;
  }

  async graphQl() {
    await this.getSchema();
    this.App.use(cors({
      origin: '*',
      credentials: true,
    }));
    this.App.use(cookieParser());
    this.App.use(express.json());
    this.App.use(express.urlencoded({ extended: true }));
    this.App.use('/graphql',
      graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
      graphqlHTTP(
        (request: any, response: any) => ({
          schema: this.Schema,
          graphiql: true,
          customFormatErrorFn: (error: any) => ({
            message: error.message,
            locations: error.locations,
            stack: error.stack ? error.stack.split('\n') : [],
            path: error.path,
          }),
          context: {
            req: request,
            res: response,
            ...this.serviceRegistry.services,
            ...Context,
          },
        })
      ));

    logger.info('Create service GraphQL');
  }

  async Start() {
    await this.graphQl();
    await this.db;
    new Playground().Init(this.App);
    Jwt.init(passport, this.serviceRegistry);
    this.App.use(passport.initialize());
    this.App.listen(graphqlConfig.port, () => {
      logger.info(`GraphQL Server is now running on port ${graphqlConfig.port}`);
    });
  }
}

new Server().Start();
