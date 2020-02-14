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

import { Action } from './action.entity';

@Entity({ name: 'approvers_reviewers' })
export class ApproverReviewer {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
        type: 'integer',
        unsigned: true
    })
    id: number;

    @Column({ name: 'name', type: 'varchar' })
    name: string;

    @Column({ name: 'charge', type: 'varchar' })
    charge: string;

    @Column({ name: 'state', type: 'smallint', default: 0 })
    state: number;

    @Column({ name: 'action_id', type: 'integer' })
    actionId: number;

    @Column({ name: 'school_id', type: 'integer' })
    schoolId: number;

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
        type => Action,
        action => action.approversReviewers
    )
    @JoinColumn({ name: 'action_id', referencedColumnName: 'id' })
    action!: Action;

    // @OneToMany(
    //     type => AvailabilityCerticateDetail,
    //     availabilityCerticateDetail => availabilityCerticateDetail.campus
    // )
    // public availabilityCerticatesDetail!: AvailabilityCerticateDetail[];

    // @OneToMany(
    //     type => BudgetNotesDetail,
    //     budgetNotesDetail => budgetNotesDetail.campus
    // )
    // public budgetNotesDetail!: BudgetNotesDetail[];
}
