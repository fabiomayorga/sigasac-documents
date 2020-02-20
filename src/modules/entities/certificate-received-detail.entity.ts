import {
    Entity,
    Column,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';

import { BudgetAccount } from './budget-account.entity';
import { CertificateReceived } from './certificate-received.entity';
import { Revenue } from './revenue.entity';
import { PurchaseOrder } from './purchase-order.entity';

@Entity({ name: 'certificates_received_detail' })
export class CertificateReceivedDetail {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
        type: 'integer',
        unsigned: true
    })
    id: number;

    @Column({
        name: 'value',
        type: 'double precision'
    })
    value: number;

    @Column({ name: 'observations', type: 'varchar', nullable: true })
    observations: string;

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
        unsigned: true
    })
    certificateReceivedId: number;

    @Column({
        name: 'revenue_id',
        type: 'integer',
        width: 11,
        unsigned: true,
        nullable: true
    })
    revenueId: number;

    @Column({
        name: 'purchase_order_id',
        type: 'integer',
        width: 11,
        unsigned: true,
        nullable: true
    })
    purchaseOrderId: number;

    // relationships
    @ManyToOne(
        type => BudgetAccount,
        budgetAccount => budgetAccount.certificatesReceivedDetail,
        { nullable: true }
    )
    @JoinColumn({ name: 'budget_account_id', referencedColumnName: 'id' })
    public budgetAccount!: BudgetAccount;

    @ManyToOne(
        type => CertificateReceived,
        certificateReceived => certificateReceived.certificatesReceivedDetail
    )
    @JoinColumn({ name: 'certificate_received_id', referencedColumnName: 'id' })
    public certificateReceived!: CertificateReceived;

    @ManyToOne(
        type => Revenue,
        revenue => revenue.certificatesReceivedDetail,
        { nullable: true }
    )
    @JoinColumn({ name: 'revenue_id', referencedColumnName: 'id' })
    public revenue!: Revenue;

    @ManyToOne(
        type => PurchaseOrder,
        purchaseOrder => purchaseOrder.certificatesReceivedDetail,
        { nullable: true }
    )
    @JoinColumn({ name: 'revenue_id', referencedColumnName: 'id' })
    public purchaseOrder!: PurchaseOrder;
}
