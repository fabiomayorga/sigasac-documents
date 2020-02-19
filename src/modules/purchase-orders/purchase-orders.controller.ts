import {
    Controller,
    Post,
    UseGuards,
    HttpStatus,
    Res,
    Body,
    Get,
    Put,
    Param
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

import { PurchaseOrdersService } from './purchase-orders.service';
import { PurchaseOrderDto } from './dto';

@Controller(`${APP.baseURL}/purchase-orders`)
@ApiTags(`Purchase Orders`)
@ApiBearerAuth()
export class PurchaseOrdersController {
    constructor(
        private readonly purchaseOrdersService: PurchaseOrdersService
    ) {}

    @Post()
    @ApiBody({ type: PurchaseOrderDto })
    @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
    @ApiOperation({
        summary: 'creación órdenes de compra'
    })
    @UseGuards(AuthGuard('jwt'))
    async create(
        @Res() res: Response,
        @Body() purchaseOrderDto: PurchaseOrderDto,
        @User('schoolId') schoolId: number,
        @User('sub') sub: number
    ) {
        try {
            purchaseOrderDto.schoolId = schoolId;
            purchaseOrderDto.elaboratorId = sub;

            const purchaseOrder = await this.purchaseOrdersService.create(
                purchaseOrderDto
            );

            res.status(HttpStatus.CREATED).send({
                purchaseOrder
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
        summary: 'órdenes de compra',
        description: 'Listado de órdenes de compra pertenecientes a un colegio'
    })
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles(SUPER_ADMIN, SUPER_ADMIN_SCHOOL, CONTADOR, AUX_CONTADOR)
    async getBySchool(
        @Res() res: Response,
        @User('schoolId') schoolId: number = 5
    ) {
        try {
            const purchaseOrders = await this.purchaseOrdersService.getAll(
                schoolId
            );

            res.status(HttpStatus.OK).send({
                purchaseOrders
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
}
