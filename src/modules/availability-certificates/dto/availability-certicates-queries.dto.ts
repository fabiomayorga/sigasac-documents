import { ApiProperty } from '@nestjs/swagger';

export class AvailabilityCertificateParamsDto {
    @ApiProperty({ enum: ['all', 'greaterThanZero'] })
    amount: string;
}
