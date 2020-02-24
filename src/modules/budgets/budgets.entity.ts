import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { AvailabilityCertificate } from '../availability-certificates/availability-certificates.entity';
import { Concept } from './concepts.entity';
import { PurchaseOrder } from '../entities/purchase-order.entity';

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
}
