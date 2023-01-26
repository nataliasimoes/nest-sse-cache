import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { AppController } from './app.controller';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppService } from './app.service';

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'client'),
  }),
  CacheModule.register({
   isGlobal: true, // This is the default value
  })

],
  controllers: [AppController],
  providers: [AppService, {
    provide: 'APP_INTERCEPTOR',
    useClass: CacheInterceptor,
  }],
})
export class AppModule {}
