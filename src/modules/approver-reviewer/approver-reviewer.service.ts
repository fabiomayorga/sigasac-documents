import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository, getConnection } from 'typeorm';

import { ACTIONS, APPROVER_REVIEWER } from 'src/config';

import { Action } from './action.entity';
import { ApproverReviewer } from './approver-reviewer.entity';

import { ApproverReviewerDto } from './dto';

@Injectable()
export class ApproverReviewerService {
    constructor(
        @Inject(ACTIONS)
        private readonly action: Repository<Action>,
        @Inject(APPROVER_REVIEWER)
        private readonly approverReviewer: Repository<ApproverReviewer>
    ) {}

    async getActions() {
        try {
            return this.action.find({ order: { id: 'ASC' } });
        } catch (error) {
            throw error;
        }
    }

    async create(approverReviewerDto: ApproverReviewerDto) {
        try {
            return this.approverReviewer.save(approverReviewerDto);
        } catch (error) {
            throw error;
        }
    }

    async getAll(schoolId: number) {
        try {
            return this.approverReviewer.find({
                where: { schoolId },
                order: { id: 'ASC' }
            });
        } catch (error) {
            throw error;
        }
    }

    async getOnlyActives(schoolId: number) {
        try {
            return this.approverReviewer.find({
                where: { schoolId, state: 1 },
                order: { id: 'ASC' }
            });
        } catch (error) {
            throw error;
        }
    }

    async activate(id: number, schoolId: number) {
        try {
            const _approverReviewer = await this.approverReviewer.findOne({
                where: { id, schoolId }
            });

            if (_approverReviewer) {
                await getConnection()
                    .createQueryBuilder()
                    .update(ApproverReviewer)
                    .set({
                        state: 0
                    })
                    .where('schoolId = :schoolId', { schoolId })
                    .andWhere('actionId = :actionId', {
                        actionId: _approverReviewer.id
                    })
                    .execute();

                await getConnection()
                    .createQueryBuilder()
                    .update(ApproverReviewer)
                    .set({
                        state: 1
                    })
                    .where('id = :id', { id })
                    .execute();
            }

            if (!_approverReviewer) {
                throw new NotFoundException('No existe este usuario');
            }
        } catch (error) {
            throw error;
        }
    }
}
