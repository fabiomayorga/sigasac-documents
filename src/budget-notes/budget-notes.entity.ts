import {
    Entity,
    Column,
    CreateDateColumn,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

import { BudgetNotesDetail } from 'src/budget-notes/budget-notes-detail.entity';
// import { Concept } from './Concept';
// import { Subconcept } from './Subconcept';
// import { ThirdParty } from './ThirdParty';
import { Month } from 'src/months/months.entity';

@Entity({ name: 'budget_notes' })
export class BudgetNote {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
        type: 'integer',
        unsigned: true
    })
    id: number;

    @Column({
        name: 'code',
        type: 'varchar',
        length: 100
    })
    code: string;

    @Column({
        name: 'note_date',
        type: 'date'
    })
    noteDate: Date;

    @Column({
        name: 'month_id',
        type: 'integer',
        width: 11,
        unsigned: true
    })
    monthId: number;

    @Column({
        name: 'school_id',
        type: 'integer',
        width: 11,
        unsigned: true
    })
    schoolId: number;

    @Column({
        name: 'concept_id',
        type: 'integer',
        width: 11,
        unsigned: true
    })
    conceptId: number;

    @Column({
        name: 'subconcept_id',
        type: 'integer',
        width: 11,
        unsigned: true,
        nullable: true
    })
    subconceptId: number;

    @Column({
        name: 'third_party_id',
        type: 'integer',
        width: 11,
        unsigned: true,
        nullable: true
    })
    thirdPartyId: number;

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
        type => BudgetNotesDetail,
        budgetNotesDetail => budgetNotesDetail.budgetNote
    )
    public budgetNotesDetail!: BudgetNotesDetail[];

    @ManyToOne(
        type => Month,
        month => month.budgetNotes
    )
    @JoinColumn({ name: 'month_id', referencedColumnName: 'id' })
    public month!: Month;

    // @ManyToOne(
    //     type => Concept,
    //     concept => concept.budgetNotes
    // )
    // @JoinColumn({ name: 'concept_id', referencedColumnName: 'id' })
    // public concept!: Concept;

    // @ManyToOne(
    //     type => Subconcept,
    //     subconcept => subconcept.budgetNotes,
    //     { nullable: true }
    // )
    // @JoinColumn({ name: 'subconcept_id', referencedColumnName: 'id' })
    // public subconcept!: Subconcept;

    // @ManyToOne(
    //     type => ThirdParty,
    //     thirdParty => thirdParty.budgetNotes,
    //     { nullable: true }
    // )
    // @JoinColumn({ name: 'third_party_id', referencedColumnName: 'id' })
    // public thirdParty!: ThirdParty;
}
