import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class AnnuityDto {
    @ApiProperty({ required: false })
    @IsDate()
    @Type(() => Date)
    year: Date;

    @ApiProperty()
    description: string;

    schoolId: number;
}
