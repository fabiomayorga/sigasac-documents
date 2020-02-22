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

import { CertificatesReceivedService } from './certificates-received.service';
import { CertificateReceivedDto } from './dto';

@Controller(`${APP.baseURL}/certificates-received`)
@ApiTags(`Certificates Received`)
@ApiBearerAuth()
export class CertificatesReceivedController {
    constructor(
        private readonly certificatesReceivedService: CertificatesReceivedService
    ) {}

    @Post()
    @ApiBody({ type: CertificateReceivedDto })
    @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
    @ApiOperation({
        summary: 'crear',
        description: 'creación de certificados de recibido'
    })
    @UseGuards(AuthGuard('jwt'))
    async create(
        @Res() res: Response,
        @Body() certificateReceivedDto: CertificateReceivedDto,
        @User('schoolId') schoolId: number,
        @User('sub') sub: number
    ) {
        try {
            certificateReceivedDto.schoolId = schoolId;
            certificateReceivedDto.elaboratorId = sub;

            const certificatesReceived = await this.certificatesReceivedService.create(
                certificateReceivedDto
            );

            res.status(HttpStatus.CREATED).send({
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

    @Get()
    @ApiOperation({
        summary: 'listar',
        description:
            'Listado de certificados de recibido pertenecientes a un colegio'
    })
    @UseGuards(AuthGuard('jwt'), RolesGuard)
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

    @Get(':thirdPartyId')
    @ApiOperation({
        summary: 'listar por terceros',
        description:
            'Listado de certificados de recibido pertenecientes a un colegio'
    })
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles(SUPER_ADMIN, SUPER_ADMIN_SCHOOL, CONTADOR, AUX_CONTADOR)
    async getByThirdParty(
        @Res() res: Response,
        @Param('thirdPartyId') thirdPartyId: number,
        @User('schoolId') schoolId: number
    ) {
        try {
            const certificatesReceived = await this.certificatesReceivedService.getAllByThirdParty(
                schoolId,
                thirdPartyId
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

    @Patch(':certificateReceivedId')
    @ApiOperation({
        summary: 'anular',
        description: 'Anulación de certificado de recibido'
    })
    @UseGuards(AuthGuard('jwt'))
    async nullify(
        @Res() res: Response,
        @Param('certificateReceivedId') certificateReceivedId: number,
        @User('schoolId') schoolId: number
    ) {
        try {
            await this.certificatesReceivedService.nullyfy(
                schoolId,
                certificateReceivedId
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

    @Put(':certificateReceivedId')
    @ApiBody({ type: CertificateReceivedDto })
    @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
    @ApiOperation({
        summary: 'actualizar detalle',
        description: 'Actualización del detalle certificado de recibido'
    })
    @UseGuards(AuthGuard('jwt'))
    async update(
        @Res() res: Response,
        @Param('certificateReceivedId') certificateReceivedId: number,
        @Body() certificateReceivedDto: CertificateReceivedDto,
        @User('schoolId') schoolId: number
    ) {
        try {
            await this.certificatesReceivedService.update(
                schoolId,
                certificateReceivedId,
                certificateReceivedDto.certificatesReceivedDetailDto
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
