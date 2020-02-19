import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import {
    CERTIFICATE_RECEIVED_DETAIL_REPOSITORY,
    CERTIFICATE_RECEIVED_REPOSITORY
} from 'src/config';

import { CertificateReceivedDetail } from '../entities/certificate-received-detail.entity';
import { CertificateReceived } from '../entities/certificate-received.entity';

@Injectable()
export class CertificatesReceivedService {
    constructor(
        @Inject(CERTIFICATE_RECEIVED_DETAIL_REPOSITORY)
        private readonly certificateReceivedDetail: Repository<
            CertificateReceivedDetail
        >,
        @Inject(CERTIFICATE_RECEIVED_REPOSITORY)
        private readonly certificateReceived: Repository<CertificateReceived>
    ) {}

    async getAll(schoolId: number) {
        try {
            return this.certificateReceived.find({ where: { schoolId } });
        } catch (error) {
            throw error;
        }
    }
}
