import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { promises as fs } from 'fs';

@Catch(UnprocessableEntityException)
export class DeleteFileOnErrorFilter implements ExceptionFilter {
  async catch(exception: UnprocessableEntityException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    console.log('Deleting file on error');

    if (request.file.path) {
      await fs.unlink(request.file.path);
    }

    response.status(status).json(exception.getResponse());
  }
}
