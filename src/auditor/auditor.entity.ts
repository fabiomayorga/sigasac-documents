import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';

import { DBEntity } from 'src/entity/entity.entity';

@Entity({ name: 'db_audit' })
export class DatabaseAudit {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
        type: 'integer',
        unsigned: true
    })
    id: number;

    @Column({ name: 'user_id', type: 'integer', unsigned: true })
    userId: number;

    @Column({ name: 'entity_id', type: 'integer', unsigned: true })
    entityId: number;

    @Column({ name: 'action', type: 'varchar' })
    action: string;

    @Column({ name: 'before_action', type: 'jsonb', nullable: true })
    beforeAction: string;

    @Column({ name: 'after_action', type: 'jsonb', nullable: true })
    afterAction: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp without time zone'
    })
    createdAt: Date;

    // relationships
    @ManyToOne(
        type => DBEntity,
        dbEntity => dbEntity.audits,
        { nullable: true }
    )
    @JoinColumn({ name: 'entity_id', referencedColumnName: 'id' })
    public dbEntity!: DBEntity;
}
