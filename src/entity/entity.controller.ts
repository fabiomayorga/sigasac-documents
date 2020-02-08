import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import {
    ApiTags,
    ApiConsumes,
    ApiOperation,
    ApiBearerAuth
} from '@nestjs/swagger';

import { EntityService } from './entity.service';

@Controller(`audit/v1/entities`)
@ApiTags(`entities`)
// @ApiBearerAuth()
export class EntityController {
    constructor(private readonly entityService: EntityService) {}

    @Get()
    @ApiOperation({
        summary: 'Entidades (tablas) de la base de datos',
        description:
            'Devuelve todos las entidades o tablas de la base datos solicitada'
    })
    async getAll(@Res() res: Response) {
        try {
            const entities = await this.entityService.getAll();

            res.status(HttpStatus.OK).send({
                entities
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
