import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class ClosedMonthDto {
    @IsDate()
    @Type(() => Date)
    finishDate: Date;

    stateId: number;

    closedBy: number;
}
