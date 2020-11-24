import { Logger } from 'pino';
import { SendMailInput } from '../Modules/Mailer/proto/mailer_pb';
import MailerHandler from '../Modules/Mailer/service';
import EventBus from '../Services/eventsBus';

class UserHooks {
  private logger: Logger;

  private eventsBus: EventBus;

  constructor(services: any, logger: Logger) {
    this.logger = logger;
    this.eventsBus = services.eventsBus;
    this.eventsBus.on('mutation#authSignup', this.onSignup());
    this.eventsBus.on('mutation#updateProfileUser', this.onUpdateProfile());
    this.eventsBus.on('mutation#updateEmailUser', this.onUpdateProfile());

    this.eventsBus.on('mutation#signupCustomer', this.onSignupCustomer());

    this.eventsBus.on('mutation#updateCustomer', this.onUpdateCustomer());
    this.eventsBus.on('mutation#updatePasswordCustomer', this.onUpdateCustomer());
    this.eventsBus.on('mutation#updateEmailCustomer', this.onUpdateCustomer());
  }

  onSignup() {
    return async ({ user, mailerService }: { user: any; mailerService: MailerHandler }) => {
      this.logger.info('UserHooks#onSignup.call %o', user);
      const data = new SendMailInput();
      data.setTemplate('signup');
      data.setTo(user.email);
      data.setData(Buffer.from(JSON.stringify(user)));
      return mailerService.send(data);
    };
  }

  onSignupCustomer() {
    return async ({ customer, mailerService }: { customer: any; mailerService: MailerHandler }) => {
      this.logger.info('UserHooks#onSignupCustomer.call %o', customer);
      const data = new SendMailInput();
      data.setTemplate('signup-customer');
      data.setTo(customer.email);
      data.setData(Buffer.from(JSON.stringify(customer)));
      return mailerService.send(data);
    };
  }

  onUpdateProfile() {
    return async ({ user, mailerService }: { user: any; mailerService: MailerHandler }) => {
      this.logger.info('UserHooks#onUpdateProfile.call %o', user);

      const data = new SendMailInput();
      data.setTemplate('update-account');
      data.setTo(user.email);
      data.setData(Buffer.from(JSON.stringify(user)));
      return mailerService.send(data);
    };
  }

  onUpdateCustomer() {
    return async ({ customer, mailerService }: { customer: any; mailerService: MailerHandler }) => {
      this.logger.info('UserHooks#onUpdateCustomer.call %o', customer);

      const data = new SendMailInput();
      data.setTemplate('update-customer');
      data.setTo(customer.email);
      data.setData(Buffer.from(JSON.stringify(customer)));
      return mailerService.send(data);
    };
  }
}
export default UserHooks;
