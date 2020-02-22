import {
    Injectable,
    Inject,
    ConflictException,
    NotFoundException
} from '@nestjs/common';
import { Repository, getConnection } from 'typeorm';

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

            paymentOrderDto.monthId = months[0].id;

            paymentOrderDto.approverId = approverId;
            paymentOrderDto.reviewerId = reviewerId;

            paymentOrderDto.totalAmount = paymentOrderDto.paymentOrderDetailDto
                .map(d => d.value)
                .reduce((acc, cur) => acc + cur);

            const _paymentOrder = await this.paymentOrder.save(paymentOrderDto);

            await this.paymentOrderDetail.save(
                this.addPoIdToPODetail(
                    _paymentOrder.id,
                    paymentOrderDto.paymentOrderDetailDto
                )
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

    async nullyfy(schoolId: number, id: number) {
        try {
            const _paymentOrder = await this.paymentOrder.findOne({
                where: { id, schoolId }
            });

            if (_paymentOrder) {
                _paymentOrder.state = 0;
                await this.paymentOrder.save(_paymentOrder);
            }

            if (!_paymentOrder) {
                throw new NotFoundException(
                    `No existe el documento solicitado`
                );
            }
        } catch (error) {
            throw error;
        }
    }

    async update(
        schoolId: number,
        id: number,
        paymentOrdersDetailDto: PaymentOrderDetailDto[]
    ) {
        try {
            const _paymentOrder = await this.paymentOrder.findOne({
                where: { id, schoolId }
            });

            // eliminar detalle
            if (_paymentOrder) {
                await getConnection()
                    .createQueryBuilder()
                    .delete()
                    .from(PaymentOrderDetail)
                    .where('paymentOrderId = :paymentOrderId', {
                        paymentOrderId: _paymentOrder.id
                    })
                    .execute();

                _paymentOrder.totalAmount = paymentOrdersDetailDto
                    .map(d => d.value)
                    .reduce((acc, cur) => acc + cur);

                await this.paymentOrder.save(_paymentOrder);

                await this.paymentOrderDetail.save(
                    this.addPoIdToPODetail(
                        _paymentOrder.id,
                        paymentOrdersDetailDto
                    )
                );
            }
        } catch (error) {
            throw error;
        }
    }

    private addPoIdToPODetail(
        paymentOrderId: number,
        paymentOrdersDetailDto: PaymentOrderDetailDto[]
    ) {
        const _paymentOrdersDetail: PaymentOrderDetailDto[] = [];

        for (let poDetail of paymentOrdersDetailDto) {
            poDetail.paymentOrderId = paymentOrderId;

            _paymentOrdersDetail.push(poDetail);
        }

        return _paymentOrdersDetail;
    }
}
