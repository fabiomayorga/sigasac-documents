import { ApiProperty } from '@nestjs/swagger';

export class PaymentOrderDetailDto {
    paymentOrderId: number;

    @ApiProperty({ required: false })
    value: number;

    @ApiProperty({ required: false })
    certificateReceivedId: number;

    @ApiProperty({ required: false })
    revenueId: number;

    @ApiProperty({ required: false })
    budgetAccountId: number;
}
