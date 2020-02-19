import {
    Entity,
    Column,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';

import { AvailabilityCerticateDetail } from '../availability-certificates/availability-certificates-detail.entity';
import { BudgetNotesDetail } from '../budget-notes/budget-notes-detail.entity';
import { PurchaseOrderDetail } from './purchase-order-detail.entity';

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
        type => BudgetNotesDetail,
        budgetNotesDetail => budgetNotesDetail.revenue
    )
    public budgetNotesDetail!: BudgetNotesDetail[];

    @OneToMany(
        type => AvailabilityCerticateDetail,
        availabilityCerticateDetail => availabilityCerticateDetail.revenue
    )
    public availabilityCerticatesDetail!: AvailabilityCerticateDetail[];

    @OneToMany(
        type => PurchaseOrderDetail,
        purchaseOrderDetail => purchaseOrderDetail.revenue
    )
    public purchaseOrdersDetail!: PurchaseOrderDetail[];
}
