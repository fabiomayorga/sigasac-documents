import { Connection } from 'typeorm';

import {
    DATABASE_CONNECTION,
    AVAILABILITY_CERTIFICATE_REPOSITORY
} from '../../config';

import { AvailabilityCerticate } from './availability-certificates.entity';

export const AvailabilityCerticateProvider = [
    {
        provide: AVAILABILITY_CERTIFICATE_REPOSITORY,
        useFactory: (connection: Connection) =>
            connection.getRepository(AvailabilityCerticate),
        inject: [DATABASE_CONNECTION]
    }
];
