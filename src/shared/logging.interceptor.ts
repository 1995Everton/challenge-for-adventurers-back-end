import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now()
    const request = context.switchToHttp().getRequest() as Request
    const { method , url } =  request
    return next
      .handle()
      .pipe(
        tap(() => Logger.log(`${method} ${url} ${Date.now() - now}ms`, context.getClass().name)),
      )
  }
}