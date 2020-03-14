import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { HISTORICAL_INCOME_REPOSITORY } from 'src/config';
import { HistoricalIncome } from '../entities/historical_income.entity';

@Injectable()
export class IncomeService {
    constructor(
        @Inject(HISTORICAL_INCOME_REPOSITORY)
        private readonly month: Repository<HistoricalIncome>
    ) {}
}
