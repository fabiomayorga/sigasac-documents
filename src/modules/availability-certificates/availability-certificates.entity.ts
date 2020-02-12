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

import { AvailabilityCerticateDetail } from './availability-certificates-detail.entity';
import { Budget } from 'src/modules/budgets/budgets.entity';
import { Month } from 'src/modules/months/months.entity';

@Entity({ name: 'availability_certificates' })
export class AvailabilityCerticate {
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
        name: 'certificate_date',
        type: 'date'
    })
    certificateDate: Date;

    @Column({
        name: 'concept',
        type: 'varchar',
        nullable: true
    })
    concept: string;

    @Column({
        name: 'detail',
        type: 'varchar',
        nullable: true
    })
    detail: string;

    @Column({ name: 'state', type: 'smallint', default: 1 })
    state: number;

    @Column({
        name: 'budget_id',
        type: 'integer',
        width: 11,
        unsigned: true
    })
    budgetId: number;

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
        type => Budget,
        budget => budget.availabilityCerticates
    )
    @JoinColumn({ name: 'budget_id', referencedColumnName: 'id' })
    public budget!: Budget;

    @ManyToOne(
        type => Month,
        month => month.budgetNotes
    )
    @JoinColumn({ name: 'month_id', referencedColumnName: 'id' })
    public month!: Month;

    @OneToMany(
        type => AvailabilityCerticateDetail,
        availabilityCerticateDetail =>
            availabilityCerticateDetail.availabilityCerticate
    )
    public availabilityCerticateDetail!: AvailabilityCerticateDetail[];
}
