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
import { ApproverReviewerService } from './approver-reviewer.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/utils';
import { ApproverReviewerDto } from './dto';

@Controller(`${APP.baseURL}/approver-reviewer`)
@ApiTags(`Approver Reviewer`)
@ApiBearerAuth()
export class ApproverReviewerController {
    constructor(
        private readonly approverReviewerService: ApproverReviewerService
    ) {}

    @Post()
    @ApiBody({ type: ApproverReviewerDto })
    @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async create(
        @Res() res: Response,
        @Body() approverReviewerDto: ApproverReviewerDto,
        @User('schoolId') schoolId: number
    ) {
        try {
            approverReviewerDto.schoolId = schoolId;

            const approverReviewer = await this.approverReviewerService.create(
                approverReviewerDto
            );

            res.status(HttpStatus.CREATED).send({
                approverReviewer
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
            const approverReviewers = await this.approverReviewerService.getAll(
                schoolId
            );

            res.status(HttpStatus.OK).send({
                approverReviewers
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

    @Get('/actions')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async getActions(@Res() res: Response, @User('schoolId') schoolId: number) {
        try {
            const actions = await this.approverReviewerService.getActions();

            res.status(HttpStatus.OK).send({
                actions
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

    @Patch(':approverReviewerId')
    @ApiOperation({})
    // @UseGuards(AuthGuard('jwt'))
    async activate(
        @Res() res: Response,
        @Param('approverReviewerId') approverReviewerId: number,
        @User('schoolId') schoolId: number = 5
    ) {
        try {
            await this.approverReviewerService.activate(
                approverReviewerId,
                schoolId
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
