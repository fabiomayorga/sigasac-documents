import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/modules/database/database.module';
import { MonthsModule } from 'src/modules/months/months.module';

import { AvailabilityCertificatesController } from './availability-certificates.controller';

import { AvailabilityCerticateProvider } from './availability-certificates.provider';
import { AvailabilityCerticateDeatilProvider } from './availability-certificates-detail.provider';

import { AvailabilityCertificatesService } from './availability-certificates.service';

@Module({
    imports: [DatabaseModule, MonthsModule],
    controllers: [AvailabilityCertificatesController],
    providers: [
        ...AvailabilityCerticateDeatilProvider,
        ...AvailabilityCerticateProvider,
        AvailabilityCertificatesService
    ]
})
export class AvailabilityCertificatesModule {}
