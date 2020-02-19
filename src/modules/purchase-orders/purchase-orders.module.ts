import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { MonthsModule } from 'src/modules/months/months.module';
import { ApproverReviewerModule } from '../approver-reviewer/approver-reviewer.module';

import { PurchaseOrdersController } from './purchase-orders.controller';
import { PurchaseOrderProvider } from './purchase-orders.provider';
import { PurchaseOrdersService } from './purchase-orders.service';

@Module({
    imports: [DatabaseModule, ApproverReviewerModule, MonthsModule],
    controllers: [PurchaseOrdersController],
    providers: [PurchaseOrdersService, ...PurchaseOrderProvider]
})
export class PurchaseOrdersModule {}
