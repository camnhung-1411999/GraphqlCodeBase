import { MiddlewareInterface, ResolverData, NextFn } from 'type-graphql';
import { Logger } from 'pino';
import { isFunction } from 'lodash';
import { IContext } from '../App/Context';
import { IUser } from '../Modules/User/service/user.model';

export class LogAccessMiddleware implements MiddlewareInterface<IContext> {
  constructor(private readonly logger: Logger) { }

  async use({ context, info, args }: ResolverData<IContext>, next: NextFn) {
    if (info?.parentType.name === 'Query' || info?.parentType.name === 'Mutation') {
      const { user }: { user: IUser } = context;
      const name: string = (user && isFunction(user.email)) ? user.email() : 'Guest';

      context.logger.info(`Logging access: ${name} -> ${info?.parentType.name}.${info?.fieldName}.call %o`, args);
    }
    return next().then((data) => {
      if (info?.parentType.name === 'Query' || info?.parentType.name === 'Mutation') {
        const { user }: { user: IUser } = context;
        const name: string = (user && isFunction(user.email)) ? user.email() : 'Guest';

        context.logger.info(`Logging access: ${name} -> ${info?.parentType.name}.${info?.fieldName}.result %o`, data);
      }
    });
  }
}
