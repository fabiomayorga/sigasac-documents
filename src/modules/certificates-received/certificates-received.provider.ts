import { Connection } from 'typeorm';

import {
    DATABASE_CONNECTION,
    CERTIFICATE_RECEIVED_DETAIL_REPOSITORY,
    CERTIFICATE_RECEIVED_REPOSITORY
} from 'src/config';

import { CertificateReceived } from '../entities/certificate-received.entity';
import { CertificateReceivedDetail } from '../entities/certificate-received-detail.entity';

export const CertificatesReceivedProvider = [
    {
        provide: CERTIFICATE_RECEIVED_DETAIL_REPOSITORY,
        useFactory: (connection: Connection) =>
            connection.getRepository(CertificateReceivedDetail),
        inject: [DATABASE_CONNECTION]
    },
    {
        provide: CERTIFICATE_RECEIVED_REPOSITORY,
        useFactory: (connection: Connection) =>
            connection.getRepository(CertificateReceived),
        inject: [DATABASE_CONNECTION]
    }
];
