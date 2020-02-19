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

import { CertificatesReceivedService } from './certificates-received.service';

@Controller(`${APP.baseURL}/certificates-received`)
@ApiTags(`Certificates Received`)
@ApiBearerAuth()
export class CertificatesReceivedController {
    constructor(
        private readonly certificatesReceivedService: CertificatesReceivedService
    ) {}

    @Get()
    @ApiOperation({
        summary: 'certifcados de recibido',
        description:
            'Listado de certificados de recibido pertenecientes a un colegio'
    })
    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles(SUPER_ADMIN, SUPER_ADMIN_SCHOOL, CONTADOR, AUX_CONTADOR)
    async getBySchool(
        @Res() res: Response,
        @User('schoolId') schoolId: number
    ) {
        try {
            const certificatesReceived = await this.certificatesReceivedService.getAll(
                schoolId
            );

            res.status(HttpStatus.OK).send({
                certificatesReceived
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
