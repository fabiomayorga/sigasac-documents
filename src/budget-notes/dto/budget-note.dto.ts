import { ApiProperty } from '@nestjs/swagger';

import { BudgetNoteDetailDto } from './index';
export class BudgetNoteDto {
    schoolId: number;

    monthId: number;

    @ApiProperty()
    noteDate: string;

    @ApiProperty()
    conceptId: number;

    @ApiProperty({
        type: BudgetNoteDetailDto,
        required: false,
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
