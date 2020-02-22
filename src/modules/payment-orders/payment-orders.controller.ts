import {
    Controller,
    Post,
    UseGuards,
    HttpStatus,
    Res,
    Body,
    Get,
    Put,
    Param,
    Patch
} from '@nestjs/common';

import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

import {
    ApiTags,
    ApiConsumes,
    ApiOperation,
    ApiBearerAuth,
    ApiBody
} from '@nestjs/swagger';

import { APP } from 'src/config';

import { RolesGuard, Roles, User } from 'src/utils';

import { PaymentOrdersService } from './payment-orders.service';
import { PaymentOrderDto } from './dto';

@Controller(`${APP.baseURL}/payment-orders`)
@ApiTags(`Payment Orders`)
@ApiBearerAuth()
export class PaymentOrdersController {
    constructor(private readonly paymentOrdersService: PaymentOrdersService) {}

    @Post()
    @ApiBody({ type: PaymentOrderDto })
    @ApiConsumes('application/json', 'application/x-www-form-urlencoded')
    @ApiOperation({
        summary: 'crear',
        description: 'creación de órdenes de pago'
    })
    @UseGuards(AuthGuard('jwt'))
    async create(
        @Res() res: Response,
        @Body() paymentOrderDto: PaymentOrderDto,
        @User('schoolId') schoolId: number,
        @User('sub') sub: number
    ) {
        try {
            paymentOrderDto.schoolId = schoolId;
            paymentOrderDto.elaboratorId = sub;

            const paymentOrder = await this.paymentOrdersService.create(
                paymentOrderDto
            );

            res.status(HttpStatus.CREATED).send({
                paymentOrder
            });
        } catch (error) {
            if (error.message.statusCode) {
                return res.status(error.message.statusCode).send({
                    message: error.message
                });
            }

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: error.message,
                stack: error.stack
            });
        }
    }

    @Get()
    @ApiOperation({
        summary: 'listar',
        description: 'Listado de órdenes de pago pertenecientes a un colegio'
    })
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles(SUPER_ADMIN, SUPER_ADMIN_SCHOOL, CONTADOR, AUX_CONTADOR)
    async getBySchool(
        @Res() res: Response,
        @User('schoolId') schoolId: number = 5
    ) {
        try {
            const paymentOrders = await this.paymentOrdersService.getAll(
                schoolId
            );

            res.status(HttpStatus.OK).send({
                paymentOrders
            });
        } catch (error) {
            if (error.message.statusCode) {
                return res.status(error.message.statusCode).send({
                    message: error.message
                });
            }

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: error.message,
                stack: error.stack
            });
        }
    }

    @Patch(':paymentOrderId')
    @ApiOperation({
        summary: 'anular',
        description: 'Anulación de orden de pago'
    })
    @UseGuards(AuthGuard('jwt'))
    async nullify(
        @Res() res: Response,
        @Param('paymentOrderId') paymentOrderId: number,
        @User('schoolId') schoolId: number
    ) {
        try {
            await this.paymentOrdersService.nullyfy(schoolId, paymentOrderId);

            res.status(HttpStatus.NO_CONTENT).end();
        } catch (error) {
            if (error.message.statusCode) {
                return res.status(error.message.statusCode).send({
                    message: error.message
                });
            }

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: error.message,
                stack: error.stack
            });
        }
    }

    @Put(':paymentOrderId')
    @ApiBody({ type: PaymentOrderDto })
    @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
    @ApiOperation({
        summary: 'actualizar detalle',
        description: 'Actualización del detalle orden de pago'
    })
    @UseGuards(AuthGuard('jwt'))
    async update(
        @Res() res: Response,
        @Param('paymentOrderId') paymentOrderId: number,
        @Body() paymentOrderDto: PaymentOrderDto,
        @User('schoolId') schoolId: number
    ) {
        try {
            await this.paymentOrdersService.update(
                schoolId,
                paymentOrderId,
                paymentOrderDto.paymentOrderDetailDto
            );

            res.status(HttpStatus.NO_CONTENT).end();
        } catch (error) {
            if (error.message.statusCode) {
                return res.status(error.message.statusCode).send({
                    message: error.message
                });
            }

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: error.message,
                stack: error.stack
            });
        }
    }
}
