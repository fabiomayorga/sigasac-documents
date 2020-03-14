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
import { AnnuityService } from './annuity.service';

@Controller(`${APP.baseURL}/annuities`)
@ApiTags(`Annuity`)
@ApiBearerAuth()
export class AnnuityController {
    constructor(private readonly annuityService: AnnuityService) {}

    @Post()
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({
        summary: 'creación de anualidad por colegio',
        description:
            'Crea una anualidad automáticamente después que se halla creado un colegio'
    })
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles(SUPER_ADMIN, SUPER_ADMIN_SCHOOL, CONTADOR, AUX_CONTADOR)
    async create(@Res() res: Response, @Body() monthDto: any) {
        try {
            const annuity = await this.annuityService.create(monthDto);

            res.status(HttpStatus.CREATED).send({
                annuity
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
        summary: 'array de anualidades por colegio',
        description: 'Devuelve todos las anualidades asignadas a un colegio'
    })
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles(SUPER_ADMIN, SUPER_ADMIN_SCHOOL, CONTADOR, AUX_CONTADOR)
    async getBySchool(
        @Res() res: Response,
        @User('schoolId') schoolId: number
    ) {
        try {
            const annuities = await this.annuityService.getBySchool(schoolId);

            res.status(HttpStatus.OK).send({
                annuities
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

    @Put(':annuity')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({
        summary: 'cierre anualidad',
        description: 'Cierre de una anulaidad por parte del encargado'
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
        @Param('annuity') annuity: number,
        @User('sub') sub: number
    ) {
        try {
            let closedAnnuityDto: any;

            await this.annuityService.closed(annuity, closedAnnuityDto);

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
