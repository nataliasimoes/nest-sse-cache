import { CacheInterceptor, Controller, Get, Sse, UseInterceptors } from '@nestjs/common';
import { Observable, interval, map } from 'rxjs';
import { AppService } from './app.service';
interface CountMessage {
    data: number | string;
}
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // async getHello() {
  //   return this.appService.getHello();
  // }

  @Sse('count')
  async sendCount(){
  return this.appService.sendCount();
  }
}
