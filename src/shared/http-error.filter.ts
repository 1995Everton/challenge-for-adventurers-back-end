import { Catch, ExceptionFilter, HttpException, ArgumentsHost, Logger } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost){
    const ctx = host.switchToHttp()
    const request = ctx.getRequest() as Request
    const response = ctx.getResponse() as Response
    const status = exception.getStatus()

    const  errorResponse = {
      code: status,
      timestamp: new Date().toLocaleDateString,
      path: request.path,
      method: request.method,
      message: exception.message
    }

    Logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(errorResponse),
      'ExceptionFilter'
    )
    
    response.status(status).json(errorResponse)
  }
}