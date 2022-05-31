/* eslint-disable @typescript-eslint/no-var-requires */
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../common/EnvironmentVariables';
require('dotenv').config();
class EmailConfigService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}
  public getEmailCredentials() {
    return {
      user: this.configService.get<string>('EMAIL_LOGIN'),
      pass: this.configService.get<string>('EMAIL_PASSWORD'),
    };
  }
}
export const emailCredentials = new EmailConfigService(
  new ConfigService<EnvironmentVariables>(),
).getEmailCredentials();
