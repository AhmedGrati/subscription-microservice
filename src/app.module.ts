import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { databaseConfigService } from './config/DBConfigService';
import { SubscriptionModule } from './subscription/subscription.module';
import { MailingService } from './mailing/mailing.service';
import { MailingModule } from './mailing/mailing.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfigService),
    ConfigModule.forRoot({ isGlobal: true }),
    SubscriptionModule,
    MailingModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailingService],
})
export class AppModule {}
