import { Connection } from 'typeorm';

import {
    DATABASE_CONNECTION,
    AVAILABILITY_CERTIFICATE_DETAIL_REPOSITORY
} from '../../config';

import { AvailabilityCerticateDetail } from './availability-certificates-detail.entity';

export const AvailabilityCerticateDeatilProvider = [
    {
        provide: AVAILABILITY_CERTIFICATE_DETAIL_REPOSITORY,
        useFactory: (connection: Connection) =>
            connection.getRepository(AvailabilityCerticateDetail),
        inject: [DATABASE_CONNECTION]
    }
];
