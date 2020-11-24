/* eslint-disable @typescript-eslint/no-unused-vars */
import { ResolverData, NextFn, MiddlewareInterface } from 'type-graphql';
import * as yup from 'yup';
import { IContext } from '../App/Context';

export class ErrorMiddleware implements MiddlewareInterface<IContext> {
  async use({ info, context }: ResolverData<IContext>, next: NextFn) {
    try {
      return await next();
    } catch (err) {
      context.logger.error(err);
      let errors: any = [];
      if (err instanceof yup.ValidationError) {
        await err.inner.forEach(async (inner: any) => {
          const field = inner.path;
          errors.push({
            field,
            message: inner.errors,
          });
        });

        const errorsResult: any = [];
        await errors.forEach((Err: any) => {
          if (errorsResult.find((e: any) => e.field === Err.field)) {
            const er = errorsResult.find((e: any) => e.field === Err.field);
            er.message.push(Err.message[0]);
            const erIdx = errorsResult.findIndex((e: any) => e.field === Err.field);
            delete errorsResult[erIdx];
            errorsResult.push(er);
          } else {
            errorsResult.push({
              field: Err.field,
              message: Err.message,
            });
          }
        });
        errors = errorsResult;
      } else {
        errors.push({
          field: '',
          message: [err.message],
        });
      }
      return { errors };
    }
  }
}
