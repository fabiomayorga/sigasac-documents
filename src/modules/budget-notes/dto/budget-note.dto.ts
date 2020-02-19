import { ApiProperty } from '@nestjs/swagger';

import { BudgetNoteDetailDto } from './index';
export class BudgetNoteDto {
    schoolId: number;

    monthId: number;

    totalAmount: number;

    approverId: number;

    elaboratorId: number;

    reviewerId: number;

    @ApiProperty({ required: false })
    noteDate: string;

    @ApiProperty({ required: false })
    conceptId: number;

    @ApiProperty({
        type: BudgetNoteDetailDto,
        required: true,
        example: [
            {
                value: 0,
                budgetAccountId: 0,
                campusId: 0,
                revenueId: 0,
                projectId: 0
            }
        ]
    })
    budgetNotesDetail: BudgetNoteDetailDto[];

    @ApiProperty({ required: false })
    code: string;

    @ApiProperty({ required: false })
    subconceptId: number;

    @ApiProperty({ required: false })
    thirdPartyId: number;
}
