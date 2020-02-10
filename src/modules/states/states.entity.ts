import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Month } from 'src/modules/months/months.entity';

@Entity({ name: 'states' })
export class State {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
        type: 'integer',
        unsigned: true
    })
    id: number;

    @Column({ name: 'description', type: 'varchar' })
    description: string;

    // relationships
    @OneToMany(
        type => Month,
        month => month.state
    )
    public months!: Month[];
}
