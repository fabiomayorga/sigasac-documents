import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class MonthDto {
    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    startDate: Date;

    @ApiProperty()
    schoolId: number;
}
