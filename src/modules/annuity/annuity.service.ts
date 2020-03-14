import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { DatesHelper } from '../../utils';

import { ANNUITY_REPOSITORY } from 'src/config';
import { Annuity } from '../entities/annuity.entity';
import { AnnuityDto } from './dto';

@Injectable()
export class AnnuityService {
    constructor(
        @Inject(ANNUITY_REPOSITORY)
        private readonly annuity: Repository<Annuity>
    ) {}

    async create(annuityDto: AnnuityDto) {
        try {
            return await this.annuity.save(annuityDto);
        } catch (error) {
            throw error;
        }
    }

    async closed(id: number, annuityDto: AnnuityDto) {
        try {
            const _annuity = await this.annuity.findOne({ where: { id } });

            let newAnnuity: Annuity;

            if (_annuity) {
                _annuity.state = 0;

                await this.annuity.save(_annuity);

                newAnnuity = await this.annuity.save({
                    schoolId: annuityDto.schoolId,
                    description: annuityDto.description,
                    year: DatesHelper.addYearToDate(_annuity.year)
                });
            }

            return newAnnuity;
        } catch (error) {
            throw error;
        }
    }

    async getBySchool(schoolId: number) {
        try {
            return await this.annuity
                .createQueryBuilder('a')
                .leftJoinAndSelect('a.months', 'months')
                .where('a.schoolId = :schoolId', { schoolId })
                .getMany();
        } catch (error) {
            throw error;
        }
    }
}
