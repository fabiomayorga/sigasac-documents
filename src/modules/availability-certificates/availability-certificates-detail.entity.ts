import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

import { AvailabilityCerticate } from './availability-certificates.entity';
import { BudgetAccount } from '../entities/budget-account.entity';
import { Campus } from '../entities/campus.entity';
import { Project } from '../entities/project.entity';
import { Revenue } from '../entities/revenue.entity';

@Entity({ name: 'availability_certificate_detail' })
export class AvailabilityCerticateDetail {
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
        name: 'availability_certificate_id',
        type: 'integer',
        width: 11,
        unsigned: true
    })
    availabilityCertificateId: number;

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
        name: 'project_id',
        type: 'integer',
        width: 11,
        unsigned: true,
        nullable: true
    })
    projectId: number;

    @Column({
        name: 'revenue_id',
        type: 'integer',
        width: 11,
        unsigned: true,
        nullable: true
    })
    revenueId: number;

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
        type => AvailabilityCerticate,
        availabilityCerticate =>
            availabilityCerticate.availabilityCerticateDetail
    )
    @JoinColumn({
        name: 'availability_certificate_id',
        referencedColumnName: 'id'
    })
    public availabilityCerticate!: AvailabilityCerticate;

    @ManyToOne(
        type => BudgetAccount,
        budgetAccount => budgetAccount.availabilityCerticatesDetail,
        { nullable: true }
    )
    @JoinColumn({ name: 'budget_account_id', referencedColumnName: 'id' })
    public budgetAccount!: BudgetAccount;

    @ManyToOne(
        type => Campus,
        campus => campus.availabilityCerticatesDetail,
        { nullable: true }
    )
    @JoinColumn({ name: 'campus_id', referencedColumnName: 'id' })
    public campus!: Campus;

    @ManyToOne(
        type => Project,
        project => project.availabilityCerticatesDetail,
        { nullable: true }
    )
    @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
    public project!: Project;

    @ManyToOne(
        type => Revenue,
        revenue => revenue.availabilityCerticatesDetail,
        { nullable: true }
    )
    @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
    public revenue!: Revenue;
}
