import { Logger } from 'pino';
import EventBus from '../Services/eventsBus';

class CustomerHooks {
  private logger: Logger;

  private eventsBus: EventBus;

  constructor(services: any, logger: Logger) {
    this.logger = logger;
    this.eventsBus = services.eventsBus;
    this.eventsBus.on('customer#pushNotification', this.pushNotification());
  }

  // data -> tilte, bodym sound
  pushNotification() {
    return async ({ customer, pushNotification }: {
      customer: any; pushNotification: {
        title: string;
        body: string;
        sound: string | 'default';
      };
    }) => {
      console.log(customer);
    };
  }
}
export default CustomerHooks;
