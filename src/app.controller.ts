import { Controller, Get, Sse } from '@nestjs/common';
import { Observable, interval, map } from 'rxjs';
import { AppService } from './app.service';
interface CountMessage {
    data: number | string;
}

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Sse('count')
  sendCount(): Observable<CountMessage>{
  return interval(1000).pipe(map(num => ({ data: `olá, ${num}` })));
  }
}
