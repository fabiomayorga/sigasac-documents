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

import { AvailabilityCertificateDetail } from './availability-certificates-detail.entity';
import { ApproverReviewer } from '../approver-reviewer/approver-reviewer.entity';
import { Budget } from 'src/modules/budgets/budgets.entity';
import { Month } from 'src/modules/months/months.entity';
import { PurchaseOrderDetail } from '../entities/purchase-order-detail.entity';

@Entity({ name: 'availability_certificates' })
export class AvailabilityCertificate {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
        type: 'integer',
        unsigned: true
    })
    id: number;

    @Column({
        name: 'code',
        type: 'varchar',
        length: 100
    })
    code: string;

    @Column({
        name: 'certificate_date',
        type: 'date'
    })
    certificateDate: Date;

    @Column({
        name: 'concept',
        type: 'varchar',
        nullable: true
    })
    concept: string;

    @Column({
        name: 'detail',
        type: 'varchar',
        nullable: true
    })
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
        width: 11,
        unsigned: true
    })
    budgetId: number;

    @Column({
        name: 'month_id',
        type: 'integer',
        width: 11,
        unsigned: true
    })
    monthId: number;

    @Column({
        name: 'school_id',
        type: 'integer',
        width: 11,
        unsigned: true
    })
    schoolId: number;

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
    @ManyToOne(
        type => Budget,
        budget => budget.availabilityCerticates
    )
    @JoinColumn({ name: 'budget_id', referencedColumnName: 'id' })
    public budget!: Budget;

    @ManyToOne(
        type => Month,
        month => month.budgetNotes
    )
    @JoinColumn({ name: 'month_id', referencedColumnName: 'id' })
    public month!: Month;

    @OneToMany(
        type => AvailabilityCertificateDetail,
        availabilityCerticateDetail =>
            availabilityCerticateDetail.availabilityCerticate
    )
    public availabilityCerticateDetail!: AvailabilityCertificateDetail[];

    @ManyToOne(
        type => ApproverReviewer,
        approver => approver.availabilityCerticates
    )
    @JoinColumn({ name: 'approver_id', referencedColumnName: 'id' })
    public approver!: ApproverReviewer;

    @ManyToOne(
        type => ApproverReviewer,
        reviewer => reviewer.availabilityCerticates
    )
    @JoinColumn({ name: 'reviewer_id', referencedColumnName: 'id' })
    public reviewer!: ApproverReviewer;

    @OneToMany(
        type => PurchaseOrderDetail,
        purchaseOrderDetail => purchaseOrderDetail.availabilityCertificate
    )
    public purchaseOrdersDetail!: PurchaseOrderDetail[];

    // @ManyToOne(
    //     type => User,
    //     elaborator => elaborator.budgetNotes
    // )
    // @JoinColumn({ name: 'elaborator_id', referencedColumnName: 'id' })
    // public elaborator!: User;
}
