import {
    Controller,
    Post,
    Res,
    Body,
    HttpStatus,
    Param,
    Put,
    Get,
    UseGuards,
    Patch
} from '@nestjs/common';

import { Response } from 'express';

import {
    ApiTags,
    ApiConsumes,
    ApiOperation,
    ApiBearerAuth,
    ApiBody
} from '@nestjs/swagger';

import { APP } from 'src/config';
import { AvailabilityCertificatesService } from './availability-certificates.service';
import { AuthGuard } from '@nestjs/passport';

import { AvailabilityCertificateDto } from './dto';
import { User } from 'src/utils';

@Controller(`${APP.baseURL}/availability-certificates`)
@ApiTags(`Availability Certificates`)
@ApiBearerAuth()
export class AvailabilityCertificatesController {
    constructor(
        private readonly availabilityCertificatesService: AvailabilityCertificatesService
    ) {}

    @Post()
    @ApiBody({ type: AvailabilityCertificateDto })
    @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async create(
        @Res() res: Response,
        @Body() availabilityCertificateDto: AvailabilityCertificateDto,
        @User('schoolId') schoolId: number
    ) {
        try {
            availabilityCertificateDto.schoolId = schoolId;

            const availabilityCertificate = await this.availabilityCertificatesService.create(
                availabilityCertificateDto
            );

            res.status(HttpStatus.CREATED).send({
                availabilityCertificate
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
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async getAll(@Res() res: Response, @User('schoolId') schoolId: number) {
        try {
            const availabilityCertificates = await this.availabilityCertificatesService.getAll(
                schoolId
            );

            res.status(HttpStatus.OK).send({
                availabilityCertificates
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

    @Patch(':availabilityCertificateId')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async nullify(
        @Res() res: Response,
        @Param('availabilityCertificateId') availabilityCertificateId: number,
        @User('schoolId') schoolId: number
    ) {
        try {
            await this.availabilityCertificatesService.nullyfy(
                schoolId,
                availabilityCertificateId
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

    @Put(':availabilityCertificateId')
    @ApiBody({ type: AvailabilityCertificateDto })
    @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async update(
        @Res() res: Response,
        @Param('availabilityCertificateId') availabilityCertificateId: number,
        @Body() availabilityCertificateDto: AvailabilityCertificateDto,
        @User('schoolId') schoolId: number
    ) {
        try {
            await this.availabilityCertificatesService.update(
                schoolId,
                availabilityCertificateId,
                availabilityCertificateDto.availabilityCertificatesDetail
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
