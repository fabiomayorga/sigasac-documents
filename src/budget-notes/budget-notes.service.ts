import { Injectable, Inject, ConflictException } from '@nestjs/common';

import { Repository } from 'typeorm';

import {
    BUDGET_NOTE_REPOSITORY,
    BUDGET_NOTE_DETAIL_REPOSITORY
} from 'src/config';

import { MonthsService } from 'src/months/months.service';

import { BudgetNote } from './budget-notes.entity';
import { BudgetNotesDetail } from './budget-notes-detail.entity';

import { BudgetNoteDto, BudgetNoteDetailDto } from './dto';

@Injectable()
export class BudgetNotesService {
    constructor(
        @Inject(BUDGET_NOTE_REPOSITORY)
        private readonly budgetNote: Repository<BudgetNote>,
        @Inject(BUDGET_NOTE_DETAIL_REPOSITORY)
        private readonly budgetNoteDetail: Repository<BudgetNotesDetail>,
        private readonly monthsService: MonthsService
    ) {}

    async create(budgetNoteDto: BudgetNoteDto) {
        try {
            const months = await this.monthsService.getBySchoolId(
                budgetNoteDto.schoolId
            );

            if (!months.length) {
                throw new ConflictException(
                    'No hay periodos creados o abiertos actualmente para la institución'
                );
            }

            budgetNoteDto.monthId = months[0].id;

            const _budgetNote = await this.budgetNote.save(budgetNoteDto);

            await this.budgetNoteDetail.save(
                this.addBudgetIdToBudgetNotesDetail(
                    _budgetNote.id,
                    budgetNoteDto.budgetNotesDetail
                )
            );

            return _budgetNote;
        } catch (error) {
            throw error;
        }
    }

    private addBudgetIdToBudgetNotesDetail(
        budgetNoteId: number,
        budgetNotesDetail: BudgetNoteDetailDto[]
    ) {
        const _budgetNotesDetail: BudgetNoteDetailDto[] = [];

        for (let budgetNoteDetail of budgetNotesDetail) {
            budgetNoteDetail.budgetNoteId = budgetNoteId;

            _budgetNotesDetail.push(budgetNoteDetail);
        }

        return _budgetNotesDetail;
    }
}
