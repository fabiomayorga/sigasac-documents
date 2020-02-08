import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const stackErrors = exception.stack;
        const message = exception.message.error;
        const info = request.authInfo['message'];

        response.status(status).json({
            statusCode: status,
            message,
            info,
            timestamp: new Date().toISOString(),
            path: request.url
            // stackErrors
        });
    }
}
