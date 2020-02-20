import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';

import {
    PAYMENT_ORDER_DETAIL_REPOSITORY,
    PAYMENT_ORDER_REPOSITORY
} from 'src/config';

import { MonthsService } from '../months/months.service';
import { ApproverReviewerService } from '../approver-reviewer/approver-reviewer.service';

import { PaymentOrder } from '../entities/payment-order.entity';
import { PaymentOrderDetail } from '../entities/payment-order-detail.entity';
import { PaymentOrderDto, PaymentOrderDetailDto } from './dto';

@Injectable()
export class PaymentOrdersService {
    constructor(
        @Inject(PAYMENT_ORDER_DETAIL_REPOSITORY)
        private readonly paymentOrder: Repository<PaymentOrder>,
        @Inject(PAYMENT_ORDER_REPOSITORY)
        private readonly paymentOrderDetail: Repository<PaymentOrderDetail>,
        private readonly monthsService: MonthsService,
        private readonly approverReviewerService: ApproverReviewerService
    ) {}

    async create(paymentOrderDto: PaymentOrderDto) {
        try {
            const months = await this.monthsService.getBySchoolId(
                paymentOrderDto.schoolId
            );

            if (!months.length) {
                throw new ConflictException(
                    'No hay periodos creados o abiertos actualmente para la institución'
                );
            }

            const {
                approverId,
                reviewerId
            } = await this.approverReviewerService.getOnlyActives(
                paymentOrderDto.schoolId
            );
        } catch (error) {
            throw error;
        }
    }

    async getAll(schoolId: number) {
        try {
            return this.paymentOrder.find({ where: { schoolId } });
        } catch (error) {
            throw error;
        }
    }
}
