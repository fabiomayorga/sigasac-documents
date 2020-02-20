import { ApiProperty } from '@nestjs/swagger';

export class PaymentOrderDetailDto {
    certificateReceivedId: number;

    @ApiProperty({ required: false })
    value: number;

    @ApiProperty({ required: false })
    observations: string;

    @ApiProperty({ required: false })
    revenueId: number;

    @ApiProperty({ required: false })
    budgetAccountId: number;
}
