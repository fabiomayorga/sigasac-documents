import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';

import {
    CERTIFICATE_RECEIVED_DETAIL_REPOSITORY,
    CERTIFICATE_RECEIVED_REPOSITORY
} from 'src/config';

import { MonthsService } from '../months/months.service';
import { ApproverReviewerService } from '../approver-reviewer/approver-reviewer.service';

import { CertificateReceivedDetail } from '../entities/certificate-received-detail.entity';
import { CertificateReceived } from '../entities/certificate-received.entity';
import { CertificateReceivedDetailDto, CertificateReceivedDto } from './dto';

@Injectable()
export class CertificatesReceivedService {
    constructor(
        @Inject(CERTIFICATE_RECEIVED_DETAIL_REPOSITORY)
        private readonly certificateReceivedDetail: Repository<
            CertificateReceivedDetail
        >,
        @Inject(CERTIFICATE_RECEIVED_REPOSITORY)
        private readonly certificateReceived: Repository<CertificateReceived>,
        private readonly monthsService: MonthsService,
        private readonly approverReviewerService: ApproverReviewerService
    ) {}

    async create(certicateReceivedDto: CertificateReceivedDto) {
        try {
            const months = await this.monthsService.getBySchoolId(
                certicateReceivedDto.schoolId
            );

            if (!months.length) {
                throw new ConflictException(
                    'No hay periodos creados o abiertos actualmente para la institución'
                );
            }

            const {
                approverId,
                reviewerId
            } = await this.approverReviewerService.getOnlyActives(
                certicateReceivedDto.schoolId
            );
        } catch (error) {
            throw error;
        }
    }

    async getAll(schoolId: number) {
        try {
            return this.certificateReceived.find({ where: { schoolId } });
        } catch (error) {
            throw error;
        }
    }
}
