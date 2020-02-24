import {
    Injectable,
    Inject,
    ConflictException,
    NotFoundException
} from '@nestjs/common';
import { Repository, getConnection } from 'typeorm';

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
    ) { }

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

            certicateReceivedDto.monthId = months[0].id;

            certicateReceivedDto.approverId = approverId;
            certicateReceivedDto.reviewerId = reviewerId;

            certicateReceivedDto.totalAmount = certicateReceivedDto.certificatesReceivedDetailDto
                .map(d => d.value)
                .reduce((acc, cur) => acc + cur);

            const _certificateReceived = await this.certificateReceived.save(
                certicateReceivedDto
            );

            await this.certificateReceivedDetail.save(
                this.addCRIdToCRDetail(
                    _certificateReceived.id,
                    certicateReceivedDto.certificatesReceivedDetailDto
                )
            );
        } catch (error) {
            throw error;
        }
    }

    async getAll(schoolId: number) {
        try {
            return this.certificateReceived
                .createQueryBuilder('cr')
                .leftJoinAndSelect('cr.month', 'month')
                .leftJoinAndSelect('cr.approver', 'approver')
                .leftJoinAndSelect('cr.reviewer', 'reviewer')
                .leftJoinAndSelect('cr.thirdParty', 'tp')
                .leftJoinAndSelect('cr.budget', 'budget')
                .leftJoinAndSelect('cr.certificatesReceivedDetail', 'crd')
                .leftJoinAndSelect('crd.budgetAccount', 'budgetAccount')
                .leftJoinAndSelect('crd.revenue', 'revenue')
                .leftJoinAndSelect('crd.purchaseOrder', 'purchaseOrder')
                .leftJoinAndSelect('cr.paymentOrdersDetail', 'pod')
                .where('cr.schoolId = :schoolId', { schoolId })
                .getMany();
        } catch (error) {
            throw error;
        }
    }

    async getAllByThirdParty(schoolId: number, thirdPartyId: number) {
        try {
            return this.certificateReceived
                .createQueryBuilder('cr')
                .leftJoinAndSelect('cr.month', 'month')
                .leftJoinAndSelect('cr.approver', 'approver')
                .leftJoinAndSelect('cr.reviewer', 'reviewer')
                .leftJoinAndSelect('cr.thirdParty', 'tp')
                .leftJoinAndSelect('cr.budget', 'budget')
                .leftJoinAndSelect('cr.certificatesReceivedDetail', 'crd')
                .leftJoinAndSelect('crd.budgetAccount', 'budgetAccount')
                .leftJoinAndSelect('crd.revenue', 'revenue')
                .leftJoinAndSelect('cr.paymentOrdersDetail', 'pod')
                .where('cr.schoolId = :schoolId', { schoolId })
                .andWhere('cr.thirdPartyId = :thirdPartyId', { thirdPartyId })
                .getMany();
        } catch (error) {
            throw error;
        }
    }

    async nullyfy(schoolId: number, id: number) {
        try {
            const _certificateReceived = await this.certificateReceived.findOne(
                {
                    where: { id, schoolId }
                }
            );

            if (_certificateReceived) {
                _certificateReceived.state = 0;
                await this.certificateReceived.save(_certificateReceived);
            }

            if (!_certificateReceived) {
                throw new NotFoundException(
                    `No existe el documento solicitado`
                );
            }
        } catch (error) {
            throw error;
        }
    }

    async update(
        schoolId: number,
        id: number,
        certificatesReceivedDetailDto: CertificateReceivedDetailDto[]
    ) {
        try {
            const _certificateReceived = await this.certificateReceived.findOne(
                {
                    where: { id, schoolId }
                }
            );

            // eliminar detalle
            if (_certificateReceived) {
                await getConnection()
                    .createQueryBuilder()
                    .delete()
                    .from(CertificateReceivedDetail)
                    .where('certificateReceivedId = :certificateReceivedId', {
                        certificateReceivedId: _certificateReceived.id
                    })
                    .execute();

                _certificateReceived.totalAmount = certificatesReceivedDetailDto
                    .map(d => d.value)
                    .reduce((acc, cur) => acc + cur);

                await this.certificateReceived.save(_certificateReceived);

                await this.certificateReceivedDetail.save(
                    this.addCRIdToCRDetail(
                        _certificateReceived.id,
                        certificatesReceivedDetailDto
                    )
                );
            }
        } catch (error) {
            throw error;
        }
    }

    private addCRIdToCRDetail(
        certificateReceivedId: number,
        certificatesReceivedDetailDto: CertificateReceivedDetailDto[]
    ) {
        const _budgetNotesDetail: CertificateReceivedDetailDto[] = [];

        for (let cRDetail of certificatesReceivedDetailDto) {
            cRDetail.certificateReceivedId = certificateReceivedId;

            _budgetNotesDetail.push(cRDetail);
        }

        return _budgetNotesDetail;
    }
}
