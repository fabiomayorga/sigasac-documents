import { Module } from '@nestjs/common';

import { AvailabilityCertificatesModule } from 'src/modules/availability-certificates/availability-certificates.module';
import { ApproverReviewerModule } from 'src/modules/approver-reviewer/approver-reviewer.module';
import { DatabaseModule } from 'src/modules/database/database.module';
import { MonthsModule } from 'src/modules/months/months.module';

import { PurchaseOrdersController } from './purchase-orders.controller';
import { PurchaseOrderProvider } from './purchase-orders.provider';
import { PurchaseOrdersService } from './purchase-orders.service';

@Module({
    imports: [
        AvailabilityCertificatesModule,
        ApproverReviewerModule,
        DatabaseModule,
        MonthsModule
    ],
    controllers: [PurchaseOrdersController],
    providers: [PurchaseOrdersService, ...PurchaseOrderProvider]
})
export class PurchaseOrdersModule {}
