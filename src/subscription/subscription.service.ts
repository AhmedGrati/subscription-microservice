import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailingService } from 'src/mailing/mailing.service';
import { Repository } from 'typeorm';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { Subscription } from './entities/subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    private readonly mailingService: MailingService,
  ) {}
  async create(createSubscriptionDto: CreateSubscriptionDto) {
    const createdSubscription = await this.subscriptionRepository.create(
      createSubscriptionDto,
    );
    return this.subscriptionRepository.save(createdSubscription);
  }

  async remove(id: number) {
    return await this.subscriptionRepository.delete(id);
  }

  async handleBackToStock(productName: string) {
    const subs = await this.subscriptionRepository.find({
      where: { productName },
    });
    for (let i = 0; i < subs.length; i++) {
      const email = subs[i].userEmail;
      this.mailingService.sendEmail(email, productName);
      await this.remove(subs[i].id);
    }
  }
}
