import {
    Entity,
    Column,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';

// import { ModificationRequest } from './ModificationRequest';
// import { School } from './School';
// import { State } from './State';
// import { User } from './User';
// import { BudgetNote } from './BudgetNote';

@Entity({ name: 'months' })
export class Month {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
        type: 'integer',
        unsigned: true
    })
    id: number;

    @Column({ name: 'start_date', type: 'date' })
    startDate: Date;

    @Column({ name: 'finish_date', type: 'date', nullable: true })
    finishDate: Date;

    @Column({ name: 'closed_by', type: 'integer', width: 10, nullable: true })
    closedBy: number;

    @Column({ name: 'school_id', type: 'integer', width: 10 })
    schoolId: number;

    @Column({ name: 'state_id', type: 'integer', width: 10, default: 1 })
    stateId: number;

    // relationships
    // @OneToMany(
    //     type => ModificationRequest,
    //     modificationRequest => modificationRequest.month,
    //     { nullable: true }
    // )
    // public modificationRequest!: ModificationRequest[];

    // @OneToMany(
    //     type => BudgetNote,
    //     budgetNote => budgetNote.month
    // )
    // public budgetNotes!: BudgetNote[];

    // @ManyToOne(
    //     type => School,
    //     school => school.months
    // )
    // @JoinColumn({ name: 'school_id', referencedColumnName: 'id' })
    // public school!: School;

    // @ManyToOne(
    //     type => State,
    //     state => state.months
    // )
    // @JoinColumn({ name: 'state_id', referencedColumnName: 'id' })
    // public state!: State;

    // @ManyToOne(
    //     type => User,
    //     user => user.months
    // )
    // @JoinColumn({ name: 'closed_by', referencedColumnName: 'id' })
    // public user!: State;
}
