import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Res,
    UseGuards,
    Logger
} from '@nestjs/common';

import { Response } from 'express';

import {
    ApiTags,
    ApiConsumes,
    ApiOperation,
    ApiBearerAuth
} from '@nestjs/swagger';

import { Roles, RolesGuard, User } from '../utils';

import { AuditorService } from './auditor.service';

import { AuditDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller(`audit/v1/check`)
@ApiTags(`check`)
@ApiBearerAuth()
export class AuditorController {
    constructor(private readonly auditorService: AuditorService) {}

    @Post()
    @ApiOperation({
        summary: '',
        description: ''
    })
    @ApiConsumes(
        'application/json',
        'application/x-www-form-urlencoded',
        'application/xml'
    )
    async create(@Res() res: Response, @Body() auditDto: AuditDto) {
        try {
            const auditor = await this.auditorService.create(auditDto);

            res.status(HttpStatus.CREATED).send({
                auditor
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
        summary: '',
        description: ''
    })
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('SUPER_ADMIN')
    async getAll(@Res() res: Response, @User() user: any) {
        try {
            Logger.log(user);
            const audits = await this.auditorService.getAll();
            res.status(HttpStatus.OK).send({
                audits
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
