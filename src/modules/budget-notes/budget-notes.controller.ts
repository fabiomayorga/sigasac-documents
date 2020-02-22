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

import { BudgetNotesService } from './budget-notes.service';
import { BudgetNoteDto, BudgetNoteDetailDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/utils';
import { userInfo } from 'os';

@Controller(`${APP.baseURL}/budget-notes`)
@ApiTags(`Budget Notes`)
@ApiBearerAuth()
export class BudgetNotesController {
    constructor(private readonly budgetNotesService: BudgetNotesService) {}

    @Post()
    @ApiBody({ type: BudgetNoteDto })
    @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async create(
        @Res() res: Response,
        @Body() budgetNoteDto: BudgetNoteDto,
        @User('schoolId') schoolId: number,
        @User('sub') sub: number
    ) {
        try {
            budgetNoteDto.schoolId = schoolId;
            budgetNoteDto.elaboratorId = sub;

            const budgetNote = await this.budgetNotesService.create(
                budgetNoteDto
            );

            res.status(HttpStatus.CREATED).send({
                budgetNote
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
    async getAll(@Res() res: Response, @User('schoolId') schoolId: number = 5) {
        try {
            const budgetNotes = await this.budgetNotesService.getAll(schoolId);

            res.status(HttpStatus.OK).send({
                budgetNotes
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

    @Patch(':budgetNoteId')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async nullify(
        @Res() res: Response,
        @Param('budgetNoteId') budgetNoteId: number,
        @User('schoolId') schoolId: number
    ) {
        try {
            await this.budgetNotesService.nullyfy(schoolId, budgetNoteId);

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

    @Put(':budgetNoteId')
    @ApiBody({ type: BudgetNoteDto })
    @ApiConsumes('application/x-www-form-urlencoded', 'application/json')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async update(
        @Res() res: Response,
        @Param('budgetNoteId') budgetNoteId: number,
        @Body() budgetNoteDto: BudgetNoteDto,
        @User('schoolId') schoolId: number
    ) {
        try {
            await this.budgetNotesService.update(
                schoolId,
                budgetNoteId,
                budgetNoteDto.budgetNotesDetail
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
