import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { MonthsModule } from 'src/modules/months/months.module';
import { ApproverReviewerModule } from '../approver-reviewer/approver-reviewer.module';

import { CertificatesReceivedController } from './certificates-received.controller';
import { CertificatesReceivedProvider } from './certificates-received.provider';
import { CertificatesReceivedService } from './certificates-received.service';

@Module({
    imports: [DatabaseModule, ApproverReviewerModule, MonthsModule],
    controllers: [CertificatesReceivedController],
    providers: [CertificatesReceivedService, ...CertificatesReceivedProvider]
})
export class CertificatesReceivedModule {}
