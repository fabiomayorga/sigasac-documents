import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/modules/database/database.module';

import { ApproverReviewerController } from './approver-reviewer.controller';
import { ApproverReviewerProvider } from './approver-reviewer.provider';
import { ApproverReviewerService } from './approver-reviewer.service';

@Module({
    imports: [DatabaseModule],
    controllers: [ApproverReviewerController],
    providers: [...ApproverReviewerProvider, ApproverReviewerService]
})
export class ApproverReviewerModule {}
