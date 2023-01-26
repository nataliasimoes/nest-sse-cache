import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Observable, interval, map } from 'rxjs';
import { Cache } from 'cache-manager';
export interface CountMessage {
  data: number | string;
}
@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  private cachedItem = interval(10000).pipe(map(num => ({ data: `numero: ${Math.floor(Math.random() * 100)}` })))

  async getHello() {
    await this.cacheManager.set('cached_item', "Teste", 10)
    const cachedItem = await this.cacheManager.get('cached_item')
    console.log(cachedItem)
    return cachedItem;
  }

 async sendCount(): Promise<Observable<CountMessage>>{
    await this.cacheManager.set('cached_count', this.cachedItem, 15)
    return await this.cacheManager.get('cached_count')
  }
}
