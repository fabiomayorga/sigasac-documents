import {
    Entity,
    Column,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';

import { RequestStatus } from 'src/modules/states/request-status.entity';
import { Month } from 'src/modules/months/months.entity';

@Entity({ name: 'modification_requests' })
export class ModificationRequest {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
        type: 'integer',
        unsigned: true
    })
    id: number;

    @Column({ name: 'application_date', type: 'date' })
    applicationDate: Date;

    @Column({ name: 'start_date_requested', type: 'date' })
    startDateRequested: Date;

    @Column({ name: 'end_date_requested', type: 'date' })
    endDateRequested: Date;

    @Column({ name: 'description', type: 'varchar' })
    description: string;

    @Column({ name: 'approval_description', type: 'varchar', nullable: true })
    approvalDescription: string;

    @Column({ name: 'initial_approval_date', type: 'date', nullable: true })
    initialApprovalDate: Date;

    @Column({ name: 'end_approval_date', type: 'date', nullable: true })
    endApprovalDate: Date;

    @Column({ name: 'applicant_id', type: 'integer' })
    applicantId: number;

    @Column({ name: 'month_id', type: 'integer' })
    monthId: number;

    @Column({ name: 'request_status_id', type: 'integer' })
    requestStatusId: number;

    @Column({ name: 'approves_id', type: 'integer', nullable: true })
    approvesId: number;

    // relationships
    @ManyToOne(
        type => Month,
        month => month.modificationRequest
    )
    @JoinColumn({ name: 'month_id', referencedColumnName: 'id' })
    month!: Month;

    @ManyToOne(
        type => RequestStatus,
        requestStatus => requestStatus.modificationRequest
    )
    @JoinColumn({ name: 'request_status_id', referencedColumnName: 'id' })
    requestStatus!: RequestStatus;
}
