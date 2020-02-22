import {
    Entity,
    Column,
    CreateDateColumn,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

import { ApproverReviewer } from '../approver-reviewer/approver-reviewer.entity';
import { CertificateReceivedDetail } from './certificate-received-detail.entity';
import { Month } from 'src/modules/months/months.entity';
import { PurchaseOrderDetail } from './purchase-order-detail.entity';
import { ThirdParty } from './third-party.entity';

@Entity({ name: 'purchase_orders' })
export class PurchaseOrder {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
        type: 'integer',
        unsigned: true
    })
    id: number;

    @Column({
        name: 'date_elaboration',
        type: 'date'
    })
    dateElaboration: Date;

    @Column({
        name: 'code',
        type: 'varchar',
        length: 100
    })
    code: string;

    @Column({
        name: 'observations',
        type: 'varchar'
    })
    observations: string;

    @Column({ name: 'concept', type: 'varchar', nullable: true })
    concept: string;

    @Column({ name: 'detail', type: 'varchar', nullable: true })
    detail: string;

    @Column({
        name: 'total_amount',
        type: 'double precision',
        unsigned: true
    })
    totalAmount: number;

    @Column({ name: 'state', type: 'smallint', default: 1 })
    state: number;

    @Column({
        name: 'budget_id',
        type: 'integer',
        nullable: true
    })
    budgetId: number;

    @Column({
        name: 'third_party_id',
        type: 'integer',
        nullable: true
    })
    thirdPartyId: number;

    @Column({
        name: 'month_id',
        type: 'integer',
        width: 11,
        unsigned: true,
        nullable: true
    })
    monthId: number;

    @Column({
        name: 'school_id',
        type: 'integer',
        width: 11,
        unsigned: true
    })
    schoolId: number;

    @Column({
        name: 'approver_id',
        type: 'integer',
        width: 11,
        unsigned: true,
        nullable: true
    })
    approverId: number;

    @Column({
        name: 'elaborator_id',
        type: 'integer',
        width: 11,
        unsigned: true,
        nullable: true
    })
    elaboratorId: number;

    @Column({
        name: 'reviewer_id',
        type: 'integer',
        width: 11,
        unsigned: true,
        nullable: true
    })
    reviewerId: number;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp without time zone',
        select: false
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp without time zone',
        select: false
    })
    updatedAt: Date;

    // relationships
    @OneToMany(
        type => PurchaseOrderDetail,
        purchaseOrderDetail => purchaseOrderDetail.purchaseOrder
    )
    public purchaseOrdersDetail!: PurchaseOrderDetail[];

    @OneToMany(
        type => CertificateReceivedDetail,
        certificatesReceivedDetail => certificatesReceivedDetail.purchaseOrder
    )
    public certificatesReceivedDetail!: CertificateReceivedDetail[];

    @ManyToOne(
        type => Month,
        month => month.purchaseOrders
    )
    @JoinColumn({ name: 'month_id', referencedColumnName: 'id' })
    public month!: Month;

    @ManyToOne(
        type => ApproverReviewer,
        approver => approver.purchaseOrders
    )
    @JoinColumn({ name: 'approver_id', referencedColumnName: 'id' })
    public approver!: ApproverReviewer;

    @ManyToOne(
        type => ApproverReviewer,
        reviewer => reviewer.purchaseOrders
    )
    @JoinColumn({ name: 'reviewer_id', referencedColumnName: 'id' })
    public reviewer!: ApproverReviewer;

    @ManyToOne(
        type => ThirdParty,
        thirdParty => thirdParty.purchaseOrders
    )
    @JoinColumn({ name: 'third_party_id', referencedColumnName: 'id' })
    public thirdParty!: ThirdParty;

    // @ManyToOne(
    //     type => User,
    //     elaborator => elaborator.purchaseOrders
    // )
    // @JoinColumn({ name: 'elaborator_id', referencedColumnName: 'id' })
    // public elaborator!: User;
}
