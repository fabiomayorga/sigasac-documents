import {
    Entity,
    Column,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';

import { CertificateReceived } from './certificate-received.entity';
import { BudgetAccount } from './budget-account.entity';
import { PaymentOrder } from './payment-order.entity';
import { Revenue } from './revenue.entity';

@Entity({ name: 'payment_orders_detail' })
export class PaymentOrderDetail {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
        type: 'integer',
        unsigned: true
    })
    id: number;

    @Column({
        name: 'value',
        type: 'double precision',
        unsigned: true
    })
    value: number;

    @Column({
        name: 'budget_account_id',
        type: 'integer',
        width: 11,
        unsigned: true,
        nullable: true
    })
    budgetAccountId: number;

    @Column({
        name: 'certificate_received_id',
        type: 'integer',
        width: 11,
        unsigned: true,
        nullable: true
    })
    certificateReceivedId: number;

    @Column({
        name: 'payment_order_id',
        type: 'integer',
        width: 11,
        unsigned: true,
        nullable: true
    })
    paymentOrderId: number;

    @Column({
        name: 'revenue_id',
        type: 'integer',
        width: 11,
        unsigned: true,
        nullable: true
    })
    revenueId: number;

    // relationships
    @ManyToOne(
        type => CertificateReceived,
        certificateReceived => certificateReceived.paymentOrdersDetail,
        { nullable: true }
    )
    @JoinColumn({
        name: 'certificate_received_id',
        referencedColumnName: 'id'
    })
    public certificateReceived!: CertificateReceived;

    @ManyToOne(
        type => BudgetAccount,
        budgetAccount => budgetAccount.paymentOrdersDetail,
        { nullable: true }
    )
    @JoinColumn({ name: 'budget_account_id', referencedColumnName: 'id' })
    public budgetAccount!: BudgetAccount;

    @ManyToOne(
        type => PaymentOrder,
        paymentOrder => paymentOrder.paymentOrdersDetail
    )
    @JoinColumn({ name: 'payment_order_id', referencedColumnName: 'id' })
    public paymentOrder!: PaymentOrder;

    @ManyToOne(
        type => Revenue,
        revenue => revenue.paymentOrdersDetail,
        { nullable: true }
    )
    @JoinColumn({ name: 'revenue_id', referencedColumnName: 'id' })
    public revenue!: Revenue;
}
