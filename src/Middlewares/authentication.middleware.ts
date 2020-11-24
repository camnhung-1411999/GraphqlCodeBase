import { MiddlewareInterface, ResolverData, NextFn } from 'type-graphql';
import { isFunction, isEmpty } from 'lodash';
import { IContext } from '../App/Context';

export class AuthenticationMiddleware implements MiddlewareInterface<IContext> {
  async use({ info, context }: ResolverData<IContext>, next: NextFn) {
    const { authenticate } = info?.parentType.getFields()[info.fieldName].extensions || {};
    if (isFunction(authenticate)) {
      const user = await authenticate(context);
      context.user = { ...user };
    } else if (authenticate === true) {
      const { user } = await context.authenticate('jwt', { session: false }, context.req, context.res);

      if (!isEmpty(user)) {
        context.user = user;
      } else {
        context.res.status(401);
        throw new Error('Authentication required');
      }
    }
    return next();
  }
}
