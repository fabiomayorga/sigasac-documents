import { Connection } from 'typeorm';

import {
    DATABASE_CONNECTION,
    PURCHASE_ORDER_DETAIL_REPOSITORY,
    PURCHASE_ORDER_REPOSITORY
} from 'src/config';

import { PurchaseOrderDetail } from '../entities/purchase-order-detail.entity';
import { PurchaseOrder } from '../entities/purchase-order.entity';

export const PurchaseOrderProvider = [
    {
        provide: PURCHASE_ORDER_DETAIL_REPOSITORY,
        useFactory: (connection: Connection) =>
            connection.getRepository(PurchaseOrderDetail),
        inject: [DATABASE_CONNECTION]
    },
    {
        provide: PURCHASE_ORDER_REPOSITORY,
        useFactory: (connection: Connection) =>
            connection.getRepository(PurchaseOrder),
        inject: [DATABASE_CONNECTION]
    }
];