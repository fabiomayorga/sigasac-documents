import { Connection } from 'typeorm';

import {
    DATABASE_CONNECTION,
    AVAILABILITY_CERTIFICATE_DETAIL_REPOSITORY
} from '../../config';

import { AvailabilityCertificateDetail } from './availability-certificates-detail.entity';

export const AvailabilityCerticateDeatilProvider = [
    {
        provide: AVAILABILITY_CERTIFICATE_DETAIL_REPOSITORY,
        useFactory: (connection: Connection) =>
            connection.getRepository(AvailabilityCertificateDetail),
        inject: [DATABASE_CONNECTION]
    }
];
