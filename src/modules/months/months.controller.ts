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
    ApiBearerAuth
} from '@nestjs/swagger';

import { APP } from 'src/config';

import { RolesGuard, Roles, User } from 'src/utils';

import { MonthsService } from './months.service';
import { MonthDto, ClosedMonthDto } from './dto';

@Controller(`${APP.baseURL}/months`)
@ApiTags(`Months`)
@ApiBearerAuth()
export class MonthsController {
    constructor(private readonly monthsService: MonthsService) {}

    @Post()
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({
        summary: 'creación de mes por colegio',
        description:
            'Crea un mes automáticamente después que se halla creado un colegio'
    })
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles(SUPER_ADMIN, SUPER_ADMIN_SCHOOL, CONTADOR, AUX_CONTADOR)
    async create(@Res() res: Response, @Body() monthDto: MonthDto) {
        try {
            const month = await this.monthsService.create(monthDto);

            res.status(HttpStatus.CREATED).send({
                month
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
        summary: 'array de meses por colegio',
        description: 'Devuelve todos los meses asignados a un colegio'
    })
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles(SUPER_ADMIN, SUPER_ADMIN_SCHOOL, CONTADOR, AUX_CONTADOR)
    async getBySchool(
        @Res() res: Response,
        @User('schoolId') schoolId: number
    ) {
        try {
            const months = await this.monthsService.getBySchool(schoolId);

            res.status(HttpStatus.OK).send({
                months
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

    @Put(':monthId')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({
        summary: 'cierre mes',
        description: 'Cierre de un mes por parte del encargado'
    })
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles(
    //     SUPER_ADMIN,
    //     SUPER_ADMIN_SCHOOL,
    //     CONTADOR,
    //     AUX_CONTADOR,
    //     SUPER_ADMIN_MINEDU
    // )
    async closed(
        @Res() res: Response,
        @Param('monthId') monthId: number,
        @User('sub') sub: number
    ) {
        try {
            const closedMonthDto = new ClosedMonthDto();
            closedMonthDto.finishDate = new Date();
            closedMonthDto.closedBy = sub;
            closedMonthDto.stateId = 1;

            await this.monthsService.closed(monthId, closedMonthDto);

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
