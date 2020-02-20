import { ApiProperty } from '@nestjs/swagger';

import { CertificateReceivedDetailDto } from '.';

export class CertificateReceivedDto {
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
        type: CertificateReceivedDetailDto,
        required: true,
        example: [
            {
                value: 0,
                budgetAccountId: 0,
                revenueId: 0,
                observations: '',
                purchaseOrderId: 0
            }
        ]
    })
    purchaseOrdersDetailDto: CertificateReceivedDetailDto[];
}
