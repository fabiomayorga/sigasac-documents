import {
    Entity,
    Column,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';

import { Month } from "../months/months.entity";

@Entity({ name: 'annuities' })
export class Annuity {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
        type: 'integer',
        unsigned: true
    })
    id: number;

    @Column({ name: 'year', type: 'date' })
    year: Date;

    @Column({ name: 'description', type: 'varchar' })
    description: string;

    @Column({ name: 'state', type: 'integer', width: 10, default: 1 })
    state: number;

    @Column({ name: 'school_id', type: 'integer', width: 10 })
    schoolId: number;

    // relationships
    @OneToMany(
        type => Month,
        month => month.annuity
    )
    public months!: Month[];
}
