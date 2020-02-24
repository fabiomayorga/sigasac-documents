import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { AvailabilityCertificate } from '../availability-certificates/availability-certificates.entity';
import { Concept } from './concepts.entity';
import { PurchaseOrder } from '../entities/purchase-order.entity';
import { PaymentOrder } from '../entities/payment-order.entity';
import { CertificateReceived } from '../entities/certificate-received.entity';

@Entity({ name: 'budgets' })
export class Budget {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
        type: 'integer',
        unsigned: true
    })
    id: number;

    @Column({
        name: 'description',
        type: 'varchar',
        length: 100
    })
    description: string;

    // relationships
    @OneToMany(
        type => Concept,
        concept => concept.budget
    )
    public concepts!: Concept[];

    @OneToMany(
        type => AvailabilityCertificate,
        availabilityCerticate => availabilityCerticate.budget
    )
    public availabilityCerticates!: AvailabilityCertificate[];

    @OneToMany(
        type => PurchaseOrder,
        purchaseOrder => purchaseOrder.budget
    )
    public purchasesOrder!: PurchaseOrder[];

    @OneToMany(
        type => PaymentOrder,
        paymentsOrder => paymentsOrder.budget
    )
    public paymentsOrder!: PaymentOrder[];

    @OneToMany(
        type => CertificateReceived,
        certificatesReceived => certificatesReceived.budget
    )
    public certificatesReceived!: CertificateReceived[];
}
