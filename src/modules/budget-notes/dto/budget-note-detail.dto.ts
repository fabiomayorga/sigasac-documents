import { ApiProperty } from '@nestjs/swagger';

export class BudgetNoteDetailDto {
    budgetNoteId: number;

    @ApiProperty({ required: false })
    value: number;

    @ApiProperty({ required: false })
    budgetAccountId: number;

    @ApiProperty({ required: false })
    campusId: number;

    @ApiProperty({ required: false })
    revenueId: number;

    @ApiProperty({ required: false })
    projectId: number;
}
