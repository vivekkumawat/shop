import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MongoError } from 'mongodb';
import { Request, Response } from 'express';

@Catch(MongoError)
export class MongoErrorFilter implements ExceptionFilter {
  constructor() {}
  async catch(mongoError: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let errorCode;
    let serverMessage = 'API Validation Failed';
    if (mongoError.code === 11000) {
      errorCode = 'E11000';
      serverMessage = 'Duplicate Document found';
    }

    response.status(400).json({
      errorCode,
      message: serverMessage,
      timestamp: new Date().toISOString(),
    });
  }
}
