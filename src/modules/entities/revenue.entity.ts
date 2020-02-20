import {
    Entity,
    Column,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';

import { AvailabilityCertificateDetail } from '../availability-certificates/availability-certificates-detail.entity';
import { BudgetNotesDetail } from '../budget-notes/budget-notes-detail.entity';
import { CertificateReceivedDetail } from './certificate-received-detail.entity';
import { PurchaseOrderDetail } from './purchase-order-detail.entity';
import { PaymentOrderDetail } from './payment-order-detail.entity';

@Entity({ name: 'revenues' })
export class Revenue {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
        type: 'integer',
        unsigned: true
    })
    id: number;

    @Column({ name: 'code', type: 'varchar', nullable: true })
    code: string;

    @Column({ name: 'description', type: 'varchar' })
    description: string;

    @Column({ name: 'classification', type: 'integer' })
    classification: number;

    @Column({ name: 'state', type: 'smallint', width: 1, default: 1 })
    state: number;

    // relationships
    @OneToMany(
        type => AvailabilityCertificateDetail,
        availabilityCerticateDetail => availabilityCerticateDetail.revenue
    )
    public availabilityCerticatesDetail!: AvailabilityCertificateDetail[];

    @OneToMany(
        type => BudgetNotesDetail,
        budgetNotesDetail => budgetNotesDetail.revenue
    )
    public budgetNotesDetail!: BudgetNotesDetail[];

    @OneToMany(
        type => CertificateReceivedDetail,
        certificatesReceivedDetail => certificatesReceivedDetail.budgetAccount
    )
    public certificatesReceivedDetail!: CertificateReceivedDetail[];

    @OneToMany(
        type => PurchaseOrderDetail,
        purchaseOrderDetail => purchaseOrderDetail.revenue
    )
    public purchaseOrdersDetail!: PurchaseOrderDetail[];

    @OneToMany(
        type => PaymentOrderDetail,
        paymentOrdersDetail => paymentOrdersDetail.revenue
    )
    public paymentOrdersDetail!: PaymentOrderDetail[];
}
