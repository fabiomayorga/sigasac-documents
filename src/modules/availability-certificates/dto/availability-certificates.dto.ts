import { ApiProperty } from '@nestjs/swagger';

import { AvailabilityCertificateDetailDto } from './index';
export class AvailabilityCertificateDto {
    schoolId: number;

    monthId: number;

    totalAmount: number;

    @ApiProperty({ required: false })
    certificateDate: string;

    @ApiProperty({ required: false })
    concept: string;

    @ApiProperty({ required: false })
    code: string;

    @ApiProperty({ required: false })
    detail: string;

    @ApiProperty({ required: false })
    budgetId: number;

    @ApiProperty({
        type: AvailabilityCertificateDetailDto,
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
    availabilityCertificatesDetail: AvailabilityCertificateDetailDto[];
}
