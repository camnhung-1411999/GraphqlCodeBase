import { Logger } from 'pino';
// import CustomerHooks from './customer.hooks';
// import UserHooks from './user.hooks';

class HooksRegistry {
  private hooks: any;

  private services: any;

  private logger: Logger;

  constructor(services: any, logger: Logger) {
    this.services = services;
    this.logger = logger;
  }

  async init() {
    this.hooks = {
      // user: new UserHooks(this.services, this.logger),
      // customer: new CustomerHooks(this.services, this.logger),
    };
  }

  getHooks() {
    return this.hooks;
  }
}

export default HooksRegistry;
