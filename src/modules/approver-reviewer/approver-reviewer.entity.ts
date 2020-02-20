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

import { Action } from './action.entity';
import { AvailabilityCertificate } from '../availability-certificates/availability-certificates.entity';
import { BudgetNote } from '../budget-notes/budget-notes.entity';
import { PurchaseOrder } from '../entities/purchase-order.entity';
import { CertificateReceived } from '../entities/certificate-received.entity';

@Entity({ name: 'approvers_reviewers' })
export class ApproverReviewer {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
        type: 'integer',
        unsigned: true
    })
    id: number;

    @Column({ name: 'name', type: 'varchar' })
    name: string;

    @Column({ name: 'charge', type: 'varchar' })
    charge: string;

    @Column({ name: 'state', type: 'smallint', default: 0 })
    state: number;

    @Column({ name: 'action_id', type: 'integer' })
    actionId: number;

    @Column({ name: 'school_id', type: 'integer' })
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
        type => Action,
        action => action.approversReviewers
    )
    @JoinColumn({ name: 'action_id', referencedColumnName: 'id' })
    action!: Action;

    // @OneToMany(
    //     type => AvailabilityCerticateDetail,
    //     availabilityCerticateDetail => availabilityCerticateDetail.campus
    // )
    // public availabilityCerticatesDetail!: AvailabilityCerticateDetail[];

    @OneToMany(
        type => BudgetNote,
        budgetNotes => {
            budgetNotes.approver, budgetNotes.reviewer;
        }
    )
    public budgetNotes!: BudgetNote[];

    @OneToMany(
        type => AvailabilityCertificate,
        availabilityCerticate => {
            availabilityCerticate.approver, availabilityCerticate.reviewer;
        }
    )
    public availabilityCerticates!: AvailabilityCertificate[];

    @OneToMany(
        type => PurchaseOrder,
        purchaseOrder => {
            purchaseOrder.approver, purchaseOrder.reviewer;
        }
    )
    public purchaseOrders!: PurchaseOrder[];

    @OneToMany(
        type => CertificateReceived,
        certificateReceived => {
            certificateReceived.approver, certificateReceived.reviewer;
        }
    )
    public certificateReceived!: CertificateReceived[];
}
