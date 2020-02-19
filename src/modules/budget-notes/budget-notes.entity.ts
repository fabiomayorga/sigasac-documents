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

import { ApproverReviewer } from '../approver-reviewer/approver-reviewer.entity';
import { BudgetNotesDetail } from './budget-notes-detail.entity';
import { Concept } from '../budgets/concepts.entity';
import { Subconcept } from '../budgets/subconcepts.entity';
import { Month } from 'src/modules/months/months.entity';

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
        name: 'total_amount',
        type: 'double precision',
        unsigned: true
    })
    totalAmount: number;

    @Column({ name: 'state', type: 'smallint', default: 1 })
    state: number;

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
        name: 'approver_id',
        type: 'integer',
        width: 11,
        unsigned: true,
        nullable: true
    })
    approverId: number;

    @Column({
        name: 'elaborator_id',
        type: 'integer',
        width: 11,
        unsigned: true,
        nullable: true
    })
    elaboratorId: number;

    @Column({
        name: 'reviewer_id',
        type: 'integer',
        width: 11,
        unsigned: true,
        nullable: true
    })
    reviewerId: number;

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
        type => Concept,
        concept => concept.budgetNotes
    )
    @JoinColumn({ name: 'concept_id', referencedColumnName: 'id' })
    public concept!: Concept;

    @ManyToOne(
        type => Month,
        month => month.budgetNotes
    )
    @JoinColumn({ name: 'month_id', referencedColumnName: 'id' })
    public month!: Month;

    @ManyToOne(
        type => Subconcept,
        subconcept => subconcept.budgetNotes,
        { nullable: true }
    )
    @JoinColumn({ name: 'subconcept_id', referencedColumnName: 'id' })
    public subconcept!: Subconcept;

    @ManyToOne(
        type => ApproverReviewer,
        approver => approver.budgetNotes
    )
    @JoinColumn({ name: 'approver_id', referencedColumnName: 'id' })
    public approver!: ApproverReviewer;

    @ManyToOne(
        type => ApproverReviewer,
        reviewer => reviewer.budgetNotes
    )
    @JoinColumn({ name: 'reviewer_id', referencedColumnName: 'id' })
    public reviewer!: ApproverReviewer;

    // @ManyToOne(
    //     type => User,
    //     elaborator => elaborator.budgetNotes
    // )
    // @JoinColumn({ name: 'elaborator_id', referencedColumnName: 'id' })
    // public elaborator!: User;
}
