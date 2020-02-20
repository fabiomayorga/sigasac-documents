import {
    Entity,
    Column,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';

import { PurchaseOrder } from './purchase-order.entity';
import { Revenue } from './revenue.entity';
import { BudgetAccount } from './budget-account.entity';
import { AvailabilityCertificate } from '../availability-certificates/availability-certificates.entity';
import { PaymentOrder } from './payment-order.entity';

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
        name: 'purchase_order_id',
        type: 'integer',
        width: 11,
        unsigned: true,
        nullable: true
    })
    purchaseOrderId: number;

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
        type => PurchaseOrder,
        purchaseOrder => purchaseOrder.paymentOrdersDetail,
        { nullable: true }
    )
    @JoinColumn({
        name: 'purchase_order_id',
        referencedColumnName: 'id'
    })
    public purchaseOrder!: PurchaseOrder;

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
