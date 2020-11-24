import { Logger } from 'pino';
import EventsBus from './eventsBus';
import Modules from '../Modules/register';

class ServiceRegistry {
  public services: any;

  public eventsBus: EventsBus;

  constructor(logger: Logger) {
    this.eventsBus = new EventsBus();
    logger.info('Register Service');

    this.services = {
      eventsBus: this.eventsBus,
    };

    Object.entries(Modules.services).forEach((service) => {
      this.services = { ...this.services, [service[0].toString()]: new service[1]() };
    });
  }

  get(): void {
    return this.services;
  }
}

export default ServiceRegistry;
