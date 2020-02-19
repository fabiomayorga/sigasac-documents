import {
    Injectable,
    Inject,
    ConflictException,
    NotFoundException
} from '@nestjs/common';
import { Repository, getConnection } from 'typeorm';

import {
    AVAILABILITY_CERTIFICATE_REPOSITORY,
    AVAILABILITY_CERTIFICATE_DETAIL_REPOSITORY
} from 'src/config';

import { MonthsService } from 'src/modules/months/months.service';

import { AvailabilityCerticateDetail } from './availability-certificates-detail.entity';
import { AvailabilityCerticate } from './availability-certificates.entity';

import {
    AvailabilityCertificateDetailDto,
    AvailabilityCertificateDto
} from './dto';

@Injectable()
export class AvailabilityCertificatesService {
    constructor(
        @Inject(AVAILABILITY_CERTIFICATE_REPOSITORY)
        private readonly availabilityCerticate: Repository<
            AvailabilityCerticate
        >,
        @Inject(AVAILABILITY_CERTIFICATE_DETAIL_REPOSITORY)
        private readonly availabilityCerticateDetail: Repository<
            AvailabilityCerticateDetail
        >,
        private readonly monthsService: MonthsService
    ) { }

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

            availabilityCertificateDto.monthId = months[0].id;
            availabilityCertificateDto.totalAmount = availabilityCertificateDto.availabilityCertificatesDetail
                .map(d => d.value)
                .reduce((acc, cur) => acc + cur);

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
                    .from(AvailabilityCerticateDetail)
                    .where('budgetNoteId = :budgetNoteId', {
                        budgetNoteId: _availabilityCertificate.id
                    })
                    .execute();

                _availabilityCertificate.totalAmount = availabilityCertificateDetailDto
                    .map(d => d.value)
                    .reduce((acc, cur) => acc + cur);

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

    async getAll(schoolId: number) {
        try {
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
        } catch (error) {
            throw error;
        }
    }
}
