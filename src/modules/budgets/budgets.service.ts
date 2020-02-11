import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import {
    BUDGET_REPOSITORY,
    CONCEPT_REPOSITORY,
    SUBCONCEPT_REPOSITORY
} from 'src/config';

import { Budget } from './budgets.entity';
import { Concept } from './concepts.entity';
import { Subconcept } from './subconcepts.entity';

@Injectable()
export class BudgetsService {
    constructor(
        @Inject(BUDGET_REPOSITORY)
        private readonly budget: Repository<Budget>,
        @Inject(CONCEPT_REPOSITORY)
        private readonly concept: Repository<Concept>,
        @Inject(SUBCONCEPT_REPOSITORY)
        private readonly subconcept: Repository<Subconcept>
    ) {}

    async getAll() {
        try {
            return this.budget.find({ order: { id: 'ASC' } });
        } catch (error) {
            throw error;
        }
    }

    async getConceptsByBudgetId(budgetId: number) {
        try {
            return this.concept.find({
                where: {
                    budgetId
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async getSubconceptsByConceptId(conceptId: number) {
        try {
            return this.subconcept.find({
                where: {
                    conceptId
                }
            });
        } catch (error) {
            throw error;
        }
    }
}
