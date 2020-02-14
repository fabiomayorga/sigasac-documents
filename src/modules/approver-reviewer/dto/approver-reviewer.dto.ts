import { ApiProperty } from '@nestjs/swagger';

export class ApproverReviewerDto {
    schoolId: number;

    @ApiProperty({ required: true })
    name: string;

    @ApiProperty({ required: true })
    charge: string;

    @ApiProperty({ required: false })
    state: number;

    @ApiProperty({ required: true })
    actionId: number;
}
