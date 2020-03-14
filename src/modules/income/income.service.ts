import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { HISTORICAL_INCOME_REPOSITORY } from 'src/config';
import { HistoricalIncome } from '../entities/historical_income.entity';
import { IncomeDto } from './dto/income.dto';

@Injectable()
export class IncomeService {
    constructor(
        @Inject(HISTORICAL_INCOME_REPOSITORY)
        private readonly historicalIncome: Repository<HistoricalIncome>
    ) {}

    async create(incomeDto: IncomeDto) {
        try {
            const income = await this.historicalIncome.save(incomeDto);

            return income;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, incomeDto: IncomeDto) {
        try {
            let income = await this.historicalIncome.findOne(id);

            if (income) {
                await this.historicalIncome.save(income, { data: incomeDto });
            }
        } catch (error) {
            throw error;
        }
    }
}
