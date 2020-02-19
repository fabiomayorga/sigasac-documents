import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import {
    PURCHASE_ORDER_DETAIL_REPOSITORY,
    PURCHASE_ORDER_REPOSITORY
} from 'src/config';

import { PurchaseOrderDetail } from '../entities/purchase-order-detail.entity';
import { PurchaseOrder } from '../entities/purchase-order.entity';

@Injectable()
export class PurchaseOrdersService {
    constructor(
        @Inject(PURCHASE_ORDER_DETAIL_REPOSITORY)
        private readonly purchaseOrderDetail: Repository<PurchaseOrderDetail>,
        @Inject(PURCHASE_ORDER_REPOSITORY)
        private readonly purchaseOrder: Repository<PurchaseOrder>
    ) {}

    async getAll(schoolId: number) {
        try {
            return this.purchaseOrder.find({ where: { schoolId } });
        } catch (error) {
            throw error;
        }
    }
}
