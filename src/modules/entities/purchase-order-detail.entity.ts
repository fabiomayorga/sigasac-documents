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

@Entity({ name: 'purchase_orders_detail' })
export class PurchaseOrderDetail {
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
        name: 'availability_certificate_id',
        type: 'integer',
        width: 11,
        unsigned: true,
        nullable: true
    })
    availabilityCerticateId: number;

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
        type => AvailabilityCertificate,
        availabilityCertificate => availabilityCertificate.purchaseOrdersDetail,
        { nullable: true }
    )
    @JoinColumn({
        name: 'availability_certificate_id',
        referencedColumnName: 'id'
    })
    public availabilityCertificate!: AvailabilityCertificate;

    @ManyToOne(
        type => BudgetAccount,
        budgetAccount => budgetAccount.purchaseOrdersDetail,
        { nullable: true }
    )
    @JoinColumn({ name: 'budget_account_id', referencedColumnName: 'id' })
    public budgetAccount!: BudgetAccount;

    @ManyToOne(
        type => PurchaseOrder,
        purchaseOrder => purchaseOrder.purchaseOrdersDetail
    )
    @JoinColumn({ name: 'purchase_order_id', referencedColumnName: 'id' })
    public purchaseOrder!: PurchaseOrder;

    @ManyToOne(
        type => Revenue,
        revenue => revenue.purchaseOrdersDetail,
        { nullable: true }
    )
    @JoinColumn({ name: 'revenue_id', referencedColumnName: 'id' })
    public revenue!: Revenue;
}
