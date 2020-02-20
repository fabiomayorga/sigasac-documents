import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { MonthsModule } from 'src/modules/months/months.module';
import { ApproverReviewerModule } from '../approver-reviewer/approver-reviewer.module';

import { PaymentOrdersController } from './payment-orders.controller';
import { PaymentOrdersService } from './payment-orders.service';

@Module({
  imports: [DatabaseModule, ApproverReviewerModule, MonthsModule],
  controllers: [PaymentOrdersController],
  providers: [PaymentOrdersService]
})
export class PaymentOrdersModule {}
