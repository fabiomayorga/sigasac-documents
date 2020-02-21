import { ApiProperty } from '@nestjs/swagger';

import { PurchaseOrderDetailDto } from './';

export class PurchaseOrderDto {
    schoolId: number;

    monthId: number;

    totalAmount: number;

    approverId: number;

    elaboratorId: number;

    reviewerId: number;

    @ApiProperty()
    thirdPartyId: number;

    @ApiProperty()
    dateElaboration: Date;

    @ApiProperty({ required: false })
    concept: string;

    @ApiProperty({ required: false })
    detail: string;

    @ApiProperty({ required: false })
    observations: string;

    @ApiProperty({ required: false })
    code: string;

    @ApiProperty({
        type: PurchaseOrderDetailDto,
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
    purchaseOrdersDetailDto: PurchaseOrderDetailDto[];
}
