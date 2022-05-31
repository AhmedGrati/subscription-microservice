import { Body, Controller, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { BackToStockDTO } from './dto/back-to-stock.dto';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionService } from './subscription.service';

@Controller()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}
  @EventPattern('usersendsubscription')
  @Post('/subscribe')
  userSendSubscription(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionService.create(createSubscriptionDto);
  }
  @Post('/product-back-to-stock')
  @EventPattern('productbacktostock')
  productBackToStock(@Body() backToStock: BackToStockDTO) {
    return this.subscriptionService.handleBackToStock(backToStock.productName);
  }
}
