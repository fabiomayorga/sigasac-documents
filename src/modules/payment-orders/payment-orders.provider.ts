import { Connection } from 'typeorm';

import {
    DATABASE_CONNECTION,
    PAYMENT_ORDER_DETAIL_REPOSITORY,
    PAYMENT_ORDER_REPOSITORY
} from 'src/config';

import { PaymentOrder } from '../entities/payment-order.entity';
import { PaymentOrderDetail } from '../entities/payment-order-detail.entity';

export const PaymentOrdersProvider = [
    {
        provide: PAYMENT_ORDER_DETAIL_REPOSITORY,
        useFactory: (connection: Connection) =>
            connection.getRepository(PaymentOrderDetail),
        inject: [DATABASE_CONNECTION]
    },
    {
        provide: PAYMENT_ORDER_REPOSITORY,
        useFactory: (connection: Connection) =>
            connection.getRepository(PaymentOrder),
        inject: [DATABASE_CONNECTION]
    }
];
