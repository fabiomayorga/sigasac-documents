import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { PurchaseOrdersController } from './purchase-orders.controller';
import { PurchaseOrderProvider } from './purcharse-orders.provider';
import { PurchaseOrdersService } from './purchase-orders.service';

@Module({
    imports: [DatabaseModule],
    controllers: [PurchaseOrdersController],
    providers: [PurchaseOrdersService, ...PurchaseOrderProvider]
})
export class PurchaseOrdersModule {}
