import { ApiProperty } from '@nestjs/swagger';

export class IncomeDto {
    @ApiProperty( { required: false })
    initialApproved: number;

    @ApiProperty( { required: false })
    additions: number;

    @ApiProperty( { required: false })
    decreases: number;

    @ApiProperty( { required: false })
    transfers: number;

    @ApiProperty( { required: false })
    finalApproved: number;

    @ApiProperty( { required: false })
    incomes: number;

    @ApiProperty( { required: false })
    cashCollections: number;

    @ApiProperty( { required: false })
    paperCollections: number;

    @ApiProperty( { required: false })
    otherCollections: number;

    @ApiProperty( { required: false })
    pendingCollections: number;

    @ApiProperty( { required: false })
    available: number;

    @ApiProperty( { required: false })
    budgetAccountId: number;

    @ApiProperty( { required: false })
    monthId: number;

    @ApiProperty( { required: false })
    revenueId: number;
}
