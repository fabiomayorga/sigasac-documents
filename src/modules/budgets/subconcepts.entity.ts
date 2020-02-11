import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    JoinColumn,
    ManyToOne
} from 'typeorm';

import { BudgetNote } from '../budget-notes/budget-notes.entity';
import { Concept } from './concepts.entity';

@Entity({ name: 'subconcepts' })
export class Subconcept {
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
        name: 'concept_id',
        type: 'integer',
        width: 11,
        unsigned: true
    })
    conceptId: number;

    // relationships
    @ManyToOne(
        type => Concept,
        concept => concept.subconcepts
    )
    @JoinColumn({ name: 'concept_id', referencedColumnName: 'id' })
    public concept!: Concept;

    @OneToMany(
        type => BudgetNote,
        budgetNote => budgetNote.subconcept
    )
    public budgetNotes!: BudgetNote[];
}
