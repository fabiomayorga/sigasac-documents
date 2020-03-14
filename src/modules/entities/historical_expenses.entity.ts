import {
    Entity,
    Column,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';

import { Month } from '../months/months.entity';

@Entity({ name: 'historical_expenses' })
export class HistoricalExpenses {
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
        name: 'expenses_to_affect',
        type: 'double precision'
    })
    expensesToAffect: number;

    @Column({
        name: 'availabilities_to_commit',
        type: 'double precision'
    })
    availabilitiesToCommit: number;

    @Column({
        name: 'commitments_to_bind',
        type: 'double precision'
    })
    commitmentsToBind: number;

    @Column({
        name: 'obligations_to_pay',
        type: 'double precision'
    })
    obligationsToPay: number;

    @Column({
        name: 'payments',
        type: 'double precision'
    })
    payments: number;

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
