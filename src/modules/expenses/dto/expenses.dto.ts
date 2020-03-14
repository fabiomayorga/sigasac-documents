import { ApiProperty } from '@nestjs/swagger';

export class ExpensesDto {
    @ApiProperty({ required: false })
    initialApproved: number;

    @ApiProperty({ required: false })
    additions: number;

    @ApiProperty({ required: false })
    decreases: number;

    @ApiProperty({ required: false })
    transfers: number;

    @ApiProperty({ required: false })
    finalApproved: number;

    @ApiProperty({ required: false })
    expensesToAffect: number;

    @ApiProperty({ required: false })
    availabilitiesToCommit: number;

    @ApiProperty({ required: false })
    commitmentsToBind: number;

    @ApiProperty({ required: false })
    obligationsToPay: number;

    @ApiProperty({ required: false })
    payments: number;

    @ApiProperty({ required: false })
    available: number;

    @ApiProperty({ required: false })
    budgetAccountId: number;

    @ApiProperty({ required: false })
    monthId: number;

    @ApiProperty({ required: false })
    revenueId: number;
}
