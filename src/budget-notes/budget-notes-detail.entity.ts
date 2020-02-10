import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

// import { Campus } from './Campus';
import { BudgetNote } from 'src/budget-notes/budget-notes.entity';
// import { BudgetAccount } from './BudgetAccount';
// import { Project } from './Project';
// import { Revenue } from './Revenue';
// import { SingleAccountPlan } from './SingleAccountPlan';

@Entity()
export class BudgetNotesDetail {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
        type: 'integer',
        unsigned: true
    })
    id: number;

    @Column({
        name: 'value',
        type: 'double precision',
        unsigned: true
    })
    value: number;

    @Column({
        name: 'budget_note_id',
        type: 'integer',
        width: 11,
        unsigned: true
    })
    budgetNoteId: number;

    @Column({
        name: 'single_account_plan_id',
        type: 'integer',
        width: 11,
        unsigned: true,
        nullable: true
    })
    singleAccountPlanId: number;

    @Column({
        name: 'campus_id',
        type: 'integer',
        width: 11,
        unsigned: true,
        nullable: true
    })
    campusId: number;

    @Column({
        name: 'revenue_id',
        type: 'integer',
        width: 11,
        unsigned: true,
        nullable: true
    })
    revenueId: number;

    @Column({
        name: 'project_id',
        type: 'integer',
        width: 11,
        unsigned: true,
        nullable: true
    })
    projectId: number;

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
    @ManyToOne(
        type => BudgetNote,
        budgetNote => budgetNote.budgetNotesDetail
    )
    @JoinColumn({ name: 'budget_note_id', referencedColumnName: 'id' })
    public budgetNote!: BudgetNote;

    // @ManyToOne(
    //     type => SingleAccountPlan,
    //     singleAccountPlan => singleAccountPlan.budgetNotesDetail,
    //     { nullable: true }
    // )
    // @JoinColumn({ name: 'single_account_plan_id', referencedColumnName: 'id' })
    // public singleAccountPlan!: SingleAccountPlan;

    // @ManyToOne(
    //     type => Campus,
    //     campus => campus.budgetNotesDetail,
    //     { nullable: true }
    // )
    // @JoinColumn({ name: 'campus_id', referencedColumnName: 'id' })
    // public campus!: Campus;

    // @ManyToOne(
    //     type => Revenue,
    //     revenue => revenue.budgetNotesDetail,
    //     { nullable: true }
    // )
    // @JoinColumn({ name: 'revenue_id', referencedColumnName: 'id' })
    // public revenue!: Revenue;

    // @ManyToOne(
    //     type => Project,
    //     project => project.budgetNotesDetail,
    //     { nullable: true }
    // )
    // @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
    // public project!: Project;
}
