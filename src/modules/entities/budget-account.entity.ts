import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';

import { AvailabilityCerticateDetail } from '../availability-certificates/availability-certificates-detail.entity';
import { PurchaseOrderDetail } from './purchase-order-detail.entity';

@Entity({ name: 'budget_accounts' })
export class BudgetAccount {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
        type: 'integer',
        unsigned: true
    })
    id: number;

    @Column({ name: 'code', type: 'varchar' })
    code: string;

    @Column({ name: 'description', type: 'varchar' })
    description: string;

    @Column({ name: 'state', type: 'smallint', width: 1, default: 1 })
    state: number;

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
        type => AvailabilityCerticateDetail,
        availabilityCerticateDetail => availabilityCerticateDetail.budgetAccount
    )
    public availabilityCerticatesDetail!: AvailabilityCerticateDetail[];

    @OneToMany(
        type => PurchaseOrderDetail,
        purchaseOrderDetail => purchaseOrderDetail.budgetAccount
    )
    public purchaseOrdersDetail!: PurchaseOrderDetail[];
}
