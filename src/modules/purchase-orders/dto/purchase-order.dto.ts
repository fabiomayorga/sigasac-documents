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

    @ApiProperty()
    concept: string;

    @ApiProperty()
    detail: string;

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
