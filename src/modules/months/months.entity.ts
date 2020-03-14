import {
    Entity,
    Column,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';

import { BudgetNote } from 'src/modules/budget-notes/budget-notes.entity';
import { ModificationRequest } from 'src/modules/modification-request/modification-request.entity';
import { State } from 'src/modules/states/states.entity';
import { PurchaseOrder } from '../entities/purchase-order.entity';
import { CertificateReceived } from '../entities/certificate-received.entity';
import { PaymentOrder } from '../entities/payment-order.entity';
import { Annuity } from '../entities/annuity.entity';

@Entity({ name: 'months' })
export class Month {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
        type: 'integer',
        unsigned: true
    })
    id: number;

    @Column({ name: 'start_date', type: 'date' })
    startDate: Date;

    @Column({ name: 'finish_date', type: 'date', nullable: true })
    finishDate: Date;

    @Column({ name: 'closed_by', type: 'integer', width: 10, nullable: true })
    closedBy: number;

    @Column({ name: 'annuity_id', type: 'integer', width: 10 })
    annuityId: number;

    @Column({ name: 'school_id', type: 'integer', width: 10 })
    schoolId: number;

    @Column({ name: 'state_id', type: 'integer', width: 10, default: 1 })
    stateId: number;

    // relationships
    @OneToMany(
        type => BudgetNote,
        budgetNote => budgetNote.month
    )
    public budgetNotes!: BudgetNote[];

    @OneToMany(
        type => ModificationRequest,
        modificationRequest => modificationRequest.month,
        { nullable: true }
    )
    public modificationRequest!: ModificationRequest[];

    @OneToMany(
        type => PurchaseOrder,
        purchaseOrder => purchaseOrder.month,
        { nullable: true }
    )
    public purchaseOrders!: PurchaseOrder[];

    @OneToMany(
        type => CertificateReceived,
        certificateReceived => certificateReceived.month,
        { nullable: true }
    )
    public certificateReceived!: CertificateReceived[];

    @OneToMany(
        type => PaymentOrder,
        paymentOrder => paymentOrder.month,
        { nullable: true }
    )
    public paymentOrder!: PaymentOrder[];

    @ManyToOne(
        type => State,
        state => state.months
    )
    @JoinColumn({ name: 'state_id', referencedColumnName: 'id' })
    public state!: State;

    @ManyToOne(
        type => Annuity,
        annuity => annuity.months
    )
    @JoinColumn({ name: 'annuity_id', referencedColumnName: 'id' })
    public annuity!: Annuity;
}
