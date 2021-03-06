import {
    Injectable,
    Inject,
    ConflictException,
    NotFoundException,
    Logger
} from '@nestjs/common';
import { Repository, getConnection } from 'typeorm';

import {
    AVAILABILITY_CERTIFICATE_REPOSITORY,
    AVAILABILITY_CERTIFICATE_DETAIL_REPOSITORY
} from 'src/config';

import { ApproverReviewerService } from '../approver-reviewer/approver-reviewer.service';
import { MonthsService } from 'src/modules/months/months.service';

import { AvailabilityCertificateDetail } from './availability-certificates-detail.entity';
import { AvailabilityCertificate } from './availability-certificates.entity';

import {
    AvailabilityCertificateDetailDto,
    AvailabilityCertificateDto
} from './dto';

@Injectable()
export class AvailabilityCertificatesService {
    constructor(
        @Inject(AVAILABILITY_CERTIFICATE_REPOSITORY)
        private readonly availabilityCerticate: Repository<
            AvailabilityCertificate
        >,
        @Inject(AVAILABILITY_CERTIFICATE_DETAIL_REPOSITORY)
        private readonly availabilityCerticateDetail: Repository<
            AvailabilityCertificateDetail
        >,
        private readonly monthsService: MonthsService,
        private readonly approverReviewerService: ApproverReviewerService
    ) {}

    async create(availabilityCertificateDto: AvailabilityCertificateDto) {
        try {
            const months = await this.monthsService.getBySchoolId(
                availabilityCertificateDto.schoolId
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
                availabilityCertificateDto.schoolId
            );

            availabilityCertificateDto.monthId = months[0].id;

            availabilityCertificateDto.totalAmount = availabilityCertificateDto.availabilityCertificatesDetail
                .map(d => d.value)
                .reduce((acc, cur) => acc + cur);

            availabilityCertificateDto.approverId = approverId;
            availabilityCertificateDto.reviewerId = reviewerId;

            const _availabilityCertificate = this.availabilityCerticate.save(
                availabilityCertificateDto
            );

            await this.availabilityCerticateDetail.save(
                this.addAvailabilityCertificateIdToAvailabilityCertificateDetail(
                    (await _availabilityCertificate).id,
                    availabilityCertificateDto.availabilityCertificatesDetail
                )
            );
        } catch (error) {
            throw error;
        }
    }

    private addAvailabilityCertificateIdToAvailabilityCertificateDetail(
        availabilityCertificateId: number,
        budgetNotesDetail: AvailabilityCertificateDetailDto[]
    ) {
        const _availabilityCertificateDetail: AvailabilityCertificateDetailDto[] = [];

        for (let budgetNoteDetail of budgetNotesDetail) {
            budgetNoteDetail.availabilityCertificateId = availabilityCertificateId;

            _availabilityCertificateDetail.push(budgetNoteDetail);
        }

        return _availabilityCertificateDetail;
    }

    async nullyfy(schoolId: number, id: number) {
        try {
            const _availabilityCertificate = await this.availabilityCerticate.findOne(
                {
                    where: { id, schoolId }
                }
            );

            if (_availabilityCertificate) {
                _availabilityCertificate.state = 0;
                await this.availabilityCerticate.save(_availabilityCertificate);
            }

            if (!_availabilityCertificate) {
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
        availabilityCertificateDetailDto: AvailabilityCertificateDetailDto[]
    ) {
        try {
            const _availabilityCertificate = await this.availabilityCerticate.findOne(
                {
                    where: { id, schoolId }
                }
            );

            // eliminar detalle
            if (_availabilityCertificate) {
                await getConnection()
                    .createQueryBuilder()
                    .delete()
                    .from(AvailabilityCertificateDetail)
                    .where(
                        'availabilityCertificateId = :availabilityCertificateId',
                        {
                            availabilityCertificateId:
                                _availabilityCertificate.id
                        }
                    )
                    .execute();

                _availabilityCertificate.totalAmount = availabilityCertificateDetailDto
                    .map(d => d.value)
                    .reduce((acc, cur) => acc + cur);

                await this.availabilityCerticate.save(_availabilityCertificate);

                await this.availabilityCerticateDetail.save(
                    this.addAvailabilityCertificateIdToAvailabilityCertificateDetail(
                        _availabilityCertificate.id,
                        availabilityCertificateDetailDto
                    )
                );
            }
        } catch (error) {
            throw error;
        }
    }

    async getAll(schoolId: number, amount: string) {
        try {
            if (amount === 'all') {
                return this.availabilityCerticate
                    .createQueryBuilder('ac')
                    .leftJoinAndSelect('ac.budget', 'budget')
                    .leftJoinAndSelect('ac.month', 'month')
                    .leftJoinAndSelect('ac.availabilityCerticateDetail', 'acd')
                    .leftJoinAndSelect('acd.budgetAccount', 'budgetAccount')
                    .leftJoinAndSelect('acd.campus', 'campus')
                    .leftJoinAndSelect('acd.revenue', 'revenue')
                    .where('ac.schoolId = :schoolId', { schoolId })
                    .getMany();
            }

            if (amount === 'greaterThanZero') {
                return this.availabilityCerticate
                    .createQueryBuilder('ac')
                    .leftJoinAndSelect('ac.budget', 'budget')
                    .leftJoinAndSelect('ac.month', 'month')
                    .leftJoinAndSelect('ac.availabilityCerticateDetail', 'acd')
                    .leftJoinAndSelect('acd.budgetAccount', 'budgetAccount')
                    .leftJoinAndSelect('acd.campus', 'campus')
                    .leftJoinAndSelect('acd.revenue', 'revenue')
                    .where('ac.schoolId = :schoolId', { schoolId })
                    .andWhere('ac.totalAmount > 0')
                    .getMany();
            }
        } catch (error) {
            throw error;
        }
    }

    async getById(id: number) {
        try {
            return this.availabilityCerticate.findOne(id);
        } catch (error) {
            throw error;
        }
    }

    async saveOrUpdate(av: AvailabilityCertificate) {
        try {
            return this.availabilityCerticate.save(av);
        } catch (error) {
            throw error;
        }
    }
}
