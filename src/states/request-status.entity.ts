import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// import { ModificationRequest } from './ModificationRequest';

@Entity({ name: 'request_status' })
export class RequestStatus {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
        type: 'integer',
        unsigned: true
    })
    id: number;

    @Column({ name: 'description', type: 'varchar' })
    description: string;

    // relationships
    // @OneToMany(
    //     type => ModificationRequest,
    //     modificationRequest => modificationRequest.requestStatus,
    //     { nullable: true }
    // )
    // public modificationRequest!: ModificationRequest[];
}
