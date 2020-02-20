import { ApiProperty } from '@nestjs/swagger';

import { PaymentOrderDetailDto } from '.';

export class PaymentOrderDto {
    schoolId: number;

    monthId: number;

    totalAmount: number;

    approverId: number;

    elaboratorId: number;

    reviewerId: number;

    @ApiProperty({ required: false })
    thirdPartyId: number;

    @ApiProperty({ required: false })
    dateElaboration: Date;

    @ApiProperty({ required: false })
    concept: string;

    @ApiProperty({ required: false })
    detail: string;

    @ApiProperty({
        type: PaymentOrderDetailDto,
        required: true,
        example: [
            {
                value: 0,
                budgetAccountId: 0,
                revenueId: 0,
                availabilityCerticateId: 0
            }
        ]
    })
    purchaseOrdersDetailDto: PaymentOrderDetailDto[];
}
