import { MailerService } from '@nestjs-modules/mailer';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { userInfo } from 'os';

@Injectable()
export class MailingService {
  constructor(private readonly mailerService: MailerService) {}
  async sendEmail(email: string, productName: string) {
    this.mailerService
      .sendMail({
        to: email,
        subject: 'Product Back To Stock',
        text: `Dear User, the product ${productName} is now back to stock! Check it out!`,
      })
      .then(() => {
        return true;
      })
      .catch((err) => {
        Logger.log(err, 'SENDING EMAIL ERROR!');
        throw new InternalServerErrorException('ERROR WHILE SENDING EMAIL!');
      });
    return true;
  }
}
