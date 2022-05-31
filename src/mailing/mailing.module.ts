import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { emailCredentials } from 'src/config/EmailConfigService';
import { MailingService } from './mailing.service';
@Module({
  providers: [MailingService],
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        auth: emailCredentials,
      },
      defaults: {
        from: 'sahtiteam@gmail.com',
      },
    }),
  ],
  exports: [MailingService],
})
export class MailingModule {}
