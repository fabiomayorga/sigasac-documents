import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    JoinColumn,
    ManyToOne
} from 'typeorm';

import { Budget } from './budgets.entity';
import { BudgetNote } from '../budget-notes/budget-notes.entity';
import { Subconcept } from './subconcepts.entity';

@Entity({ name: 'concepts' })
export class Concept {
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

    @Column({
        name: 'budget_id',
        type: 'integer',
        width: 11,
        unsigned: true
    })
    budgetId: number;

    // relationships
    @ManyToOne(
        type => Budget,
        budget => budget.concepts
    )
    @JoinColumn({ name: 'budget_id', referencedColumnName: 'id' })
    public budget!: Budget;

    @OneToMany(
        type => BudgetNote,
        budgetNote => budgetNote.concept
    )
    public budgetNotes!: BudgetNote[];

    @OneToMany(
        type => Subconcept,
        subconcept => subconcept.concept
    )
    public subconcepts!: Subconcept[];
}
