import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs/promises';
import { join } from 'path';

@Catch(UnprocessableEntityException)
export class DeleteFileOnErrorFilter implements ExceptionFilter {
  async catch(exception: UnprocessableEntityException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (request.body.fileId) {
      const uploadDir = join(process.cwd(), 'upload');
      const files = await fs.readdir(uploadDir);

      const fileName = files.find((file) =>
        file.startsWith(request.body.fileId),
      );

      await fs.unlink(join(uploadDir, fileName));
    }

    response.status(status).json(exception.getResponse());
  }
}
