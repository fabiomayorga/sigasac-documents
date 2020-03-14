import {
    Entity,
    Column,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';

import { Month } from '../months/months.entity';

@Entity({ name: 'historical_income' })
export class HistoricalIncome {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
        type: 'integer',
        unsigned: true
    })
    id: number;

    @Column({
        name: 'initial_approved',
        type: 'double precision'
    })
    initialApproved: number;

    @Column({
        name: 'additions',
        type: 'double precision'
    })
    additions: number;

    @Column({
        name: 'decreases',
        type: 'double precision'
    })
    decreases: number;

    @Column({
        name: 'transfers',
        type: 'double precision'
    })
    transfers: number;

    @Column({
        name: 'final_approved',
        type: 'double precision'
    })
    finalApproved: number;

    @Column({
        name: 'incomes',
        type: 'double precision'
    })
    incomes: number;

    @Column({
        name: 'cash_collections',
        type: 'double precision'
    })
    cashCollections: number;

    @Column({
        name: 'paper_collections',
        type: 'double precision'
    })
    paperCollections: number;

    @Column({
        name: 'other_collections',
        type: 'double precision'
    })
    otherCollections: number;

    @Column({
        name: 'pending_collections',
        type: 'double precision'
    })
    pendingCollections: number;

    @Column({
        name: 'available',
        type: 'double precision'
    })
    available: number;

    @Column({ name: 'budget_account_id', type: 'integer', width: 10 })
    budgetAccountId: number;

    @Column({ name: 'month_id', type: 'integer', width: 10 })
    monthId: number;

    @Column({ name: 'revenue_id', type: 'integer', width: 10 })
    revenueId: number;

    // relationships
}
