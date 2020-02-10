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
import { BudgetNoteDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/utils';

@Controller(`${APP.baseURL}/budget-notes`)
@ApiTags(`budget-notes`)
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
        @User('schoolId') schoolId: number
    ) {
        try {
            budgetNoteDto.schoolId = schoolId;

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
}
