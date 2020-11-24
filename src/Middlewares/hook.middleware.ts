import { MiddlewareInterface, NextFn, ResolverData } from 'type-graphql';
import { IContext } from '../App/Context';

export class HookMiddleware implements MiddlewareInterface<IContext> {
  async use({ info, context }: ResolverData<IContext>, next: NextFn) {
    return next().then((data) => {
      if (info?.parentType.name === 'Query' || info?.parentType.name === 'Mutation') {
        const { logger, eventsBus } = context;
        const operation = info.fieldName;
        logger.info(`Publish event on mutation#${operation}`);
        eventsBus.publish(`mutation#${operation}`, { ...context, ...data });
      }
    });
  }
}
