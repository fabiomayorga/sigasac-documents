import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

import { Campus } from '../entities/campus.entity';
import { BudgetNote } from 'src/modules/budget-notes/budget-notes.entity';
import { Project } from '../entities/project.entity';
import { Revenue } from '../entities/revenue.entity';
import { SingleAccountPlan } from '../entities/single-account-plan.entity';
import { BudgetAccount } from '../entities/budget-account.entity';

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
        name: 'budget_account_id',
        type: 'integer',
        width: 11,
        unsigned: true,
        nullable: true
    })
    budgetAccountId: number;

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

    @ManyToOne(
        type => Campus,
        campus => campus.budgetNotesDetail,
        { nullable: true }
    )
    @JoinColumn({ name: 'campus_id', referencedColumnName: 'id' })
    public campus!: Campus;

    @ManyToOne(
        type => Project,
        project => project.budgetNotesDetail,
        { nullable: true }
    )
    @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
    public project!: Project;

    @ManyToOne(
        type => Revenue,
        revenue => revenue.budgetNotesDetail,
        { nullable: true }
    )
    @JoinColumn({ name: 'revenue_id', referencedColumnName: 'id' })
    public revenue!: Revenue;

    @ManyToOne(
        type => BudgetAccount,
        budgetAccount => budgetAccount.budgetNotesDetail,
        { nullable: true }
    )
    @JoinColumn({ name: 'budget_account_id', referencedColumnName: 'id' })
    public budgetAccount!: BudgetAccount;
}
