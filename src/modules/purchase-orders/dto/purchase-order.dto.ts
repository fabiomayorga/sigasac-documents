import { ApiProperty } from '@nestjs/swagger';

import { PurchaseOrderDetailDto } from './';

export class PurchaseOrderDto {
    schoolId: number;

    monthId: number;

    totalAmount: number;

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
                campusId: 0,
                revenueId: 0,
                projectId: 0
            }
        ]
    })
    purchaseOrdersDetailDto: PurchaseOrderDetailDto[];
}
