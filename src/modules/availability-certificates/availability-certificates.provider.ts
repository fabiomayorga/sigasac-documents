import { Connection } from 'typeorm';

import {
    DATABASE_CONNECTION,
    AVAILABILITY_CERTIFICATE_REPOSITORY
} from '../../config';

import { AvailabilityCertificate } from './availability-certificates.entity';

export const AvailabilityCerticateProvider = [
    {
        provide: AVAILABILITY_CERTIFICATE_REPOSITORY,
        useFactory: (connection: Connection) =>
            connection.getRepository(AvailabilityCertificate),
        inject: [DATABASE_CONNECTION]
    }
];
