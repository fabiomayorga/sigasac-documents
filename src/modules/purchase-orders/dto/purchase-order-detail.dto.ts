import { ApiProperty } from '@nestjs/swagger';

export class PurchaseOrderDetailDto {
    purchaseOrderId: number;
    
    @ApiProperty()
    value: number;

    @ApiProperty()
    availabilityCerticateId: number;

    @ApiProperty()
    revenueId: number;

    @ApiProperty()
    budgetAccountId: number;
}
