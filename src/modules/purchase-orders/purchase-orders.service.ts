import {
    Injectable,
    Inject,
    ConflictException,
    NotFoundException
} from '@nestjs/common';
import { Repository, getConnection } from 'typeorm';

import {
    PURCHASE_ORDER_DETAIL_REPOSITORY,
    PURCHASE_ORDER_REPOSITORY
} from 'src/config';

import { PurchaseOrderDetail } from '../entities/purchase-order-detail.entity';
import { PurchaseOrder } from '../entities/purchase-order.entity';
import { PurchaseOrderDto, PurchaseOrderDetailDto } from './dto';

import { ApproverReviewerService } from '../approver-reviewer/approver-reviewer.service';
import { MonthsService } from 'src/modules/months/months.service';
import { AvailabilityCertificatesService } from '../availability-certificates/availability-certificates.service';

@Injectable()
export class PurchaseOrdersService {
    constructor(
        @Inject(PURCHASE_ORDER_DETAIL_REPOSITORY)
        private readonly purchaseOrderDetail: Repository<PurchaseOrderDetail>,
        @Inject(PURCHASE_ORDER_REPOSITORY)
        private readonly purchaseOrder: Repository<PurchaseOrder>,
        private readonly monthsService: MonthsService,
        private readonly approverReviewerService: ApproverReviewerService,
        private readonly availabilityCertificatesService: AvailabilityCertificatesService
    ) {}

    async create(purchaseOrderDto: PurchaseOrderDto) {
        try {
            const months = await this.monthsService.getBySchoolId(
                purchaseOrderDto.schoolId
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
                purchaseOrderDto.schoolId
            );

            purchaseOrderDto.monthId = months[0].id;

            purchaseOrderDto.totalAmount = purchaseOrderDto.purchaseOrdersDetailDto
                .map(d => d.value)
                .reduce((acc, cur) => acc + cur);

            purchaseOrderDto.approverId = approverId;
            purchaseOrderDto.reviewerId = reviewerId;

            const _purchaseOrder = await this.purchaseOrder.save(
                purchaseOrderDto
            );

            await this.purchaseOrderDetail.save(
                this.addPurchaseOrderIdToPurchaseOrderDetail(
                    _purchaseOrder.id,
                    purchaseOrderDto.purchaseOrdersDetailDto
                )
            );

            // TODO comprobar que el monto del detalle no exceda el total del cdp

            // descontar certificados de disponibilidad
            for (const detail of purchaseOrderDto.purchaseOrdersDetailDto) {
                const av = await this.availabilityCertificatesService.getById(
                    detail.availabilityCerticateId
                );

                if (av) {
                    av.totalAmount = av.totalAmount - detail.value;
                    await this.availabilityCertificatesService.saveOrUpdate(av);
                }
            }
        } catch (error) {
            throw error;
        }
    }

    async getAll(schoolId: number) {
        try {
            return (
                this.purchaseOrder
                    .createQueryBuilder('order')
                    .leftJoinAndSelect('order.month', 'month')
                    .leftJoinAndSelect('order.thirdParty', 'thirdParty')
                    .leftJoinAndSelect('order.approver', 'approver')
                    .leftJoinAndSelect('order.reviewer', 'reviewer')
                    // .leftJoinAndSelect('order.elaborator', 'elaborator')
                    .leftJoinAndSelect('order.purchaseOrdersDetail', 'detail')
                    .leftJoinAndSelect('detail.availabilityCerticate', 'ac')
                    .leftJoinAndSelect('detail.budgetAccount', 'ba')
                    .leftJoinAndSelect('detail.revenue', 'r')
                    .where('order.schoolId = :schoolId', { schoolId })
                    .getMany()
            );
        } catch (error) {
            throw error;
        }
    }

    async getAllByThirdParty(schoolId: number, thirdPartyId: number) {
        try {
            return (
                this.purchaseOrder
                    .createQueryBuilder('order')
                    .leftJoinAndSelect('order.month', 'month')
                    .leftJoinAndSelect('order.thirdParty', 'thirdParty')
                    .leftJoinAndSelect('order.approver', 'approver')
                    .leftJoinAndSelect('order.reviewer', 'reviewer')
                    // .leftJoinAndSelect('order.elaborator', 'elaborator')
                    .leftJoinAndSelect('order.purchaseOrdersDetail', 'detail')
                    .leftJoinAndSelect('detail.availabilityCerticate', 'ac')
                    .leftJoinAndSelect('detail.budgetAccount', 'ba')
                    .leftJoinAndSelect('detail.revenue', 'r')
                    .where('order.schoolId = :schoolId', { schoolId })
                    .andWhere('order.thirdPartyId = :thirdPartyId', {
                        thirdPartyId
                    })
                    .getMany()
            );
        } catch (error) {
            throw error;
        }
    }

    async nullyfy(schoolId: number, id: number) {
        try {
            const _purchaseOrder = await this.purchaseOrder.findOne({
                where: { id, schoolId }
            });

            if (_purchaseOrder) {
                _purchaseOrder.state = 0;
                await this.purchaseOrder.save(_purchaseOrder);
            }

            if (!_purchaseOrder) {
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
        purchaseOrderDetailDto: PurchaseOrderDetailDto[]
    ) {
        try {
            const _purchaseOrder = await this.purchaseOrder.findOne({
                where: { id, schoolId }
            });

            // eliminar detalle
            if (_purchaseOrder) {
                await getConnection()
                    .createQueryBuilder()
                    .delete()
                    .from(PurchaseOrderDetail)
                    .where('purchaseOrderId = :purchaseOrderId', {
                        purchaseOrderId: _purchaseOrder.id
                    })
                    .execute();

                _purchaseOrder.totalAmount = purchaseOrderDetailDto
                    .map(d => d.value)
                    .reduce((acc, cur) => acc + cur);

                await this.purchaseOrder.save(_purchaseOrder);

                await this.purchaseOrderDetail.save(
                    this.addPurchaseOrderIdToPurchaseOrderDetail(
                        _purchaseOrder.id,
                        purchaseOrderDetailDto
                    )
                );
            }
        } catch (error) {
            throw error;
        }
    }

    private addPurchaseOrderIdToPurchaseOrderDetail(
        purchaseOrderId: number,
        purchaseOrdersDetail: PurchaseOrderDetailDto[]
    ) {
        const _purchaseOrdersDetailDetail: PurchaseOrderDetailDto[] = [];

        for (let purchaseOrderDetail of purchaseOrdersDetail) {
            purchaseOrderDetail.purchaseOrderId = purchaseOrderId;

            _purchaseOrdersDetailDetail.push(purchaseOrderDetail);
        }

        return _purchaseOrdersDetailDetail;
    }
}
