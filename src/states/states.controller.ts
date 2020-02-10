import {
    Controller,
    Post,
    Res,
    Body,
    HttpStatus,
    Param,
    Put,
    Get,
    Query,
    Patch,
    UseGuards
} from '@nestjs/common';

import { Response } from 'express';

import {
    ApiBearerAuth,
    ApiConsumes,
    ApiOperation,
    ApiProduces,
    ApiTags
} from '@nestjs/swagger';

import { APP } from 'src/config';

import { StatesService } from './states.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard, Roles } from 'src/utils';

@Controller(`${APP.baseURL}/states`)
@ApiTags(`states`)
@ApiBearerAuth()
export class StatesController {
    constructor(private readonly statesService: StatesService) {}

    @Get('months')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles(SUPER_ADMIN, SUPER_ADMIN, SUPER_ADMIN_SCHOOL, CONTADOR, AUX_CONTADOR)
    async getAll(@Res() res: Response) {
        try {
            const states = await this.statesService.getAll();

            res.status(HttpStatus.OK).send({
                states
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

    @Get('requests')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    // @Roles(SUPER_ADMIN, SUPER_ADMIN, SUPER_ADMIN_SCHOOL, CONTADOR, AUX_CONTADOR)
    async getAllRequestStatus(@Res() res: Response) {
        try {
            const requestStatus = await this.statesService.getAllRequestStatus();

            res.status(HttpStatus.OK).send({
                requestStatus
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
