import { ApiProperty } from '@nestjs/swagger';

export class AuditDto {
    @ApiProperty()
    userId: number;

    @ApiProperty()
    entityId: number;

    @ApiProperty()
    action: string;

    @ApiProperty({ required: false })
    beforeAction?: any;

    @ApiProperty({ required: false })
    afterAction?: any;
}
