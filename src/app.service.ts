import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Observable, interval, map } from 'rxjs';
import { Cache } from 'cache-manager';
export interface CountMessage {
  data: number | string;
}
@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    // seta o valor do cache
    this.cacheManager.set('cached_count', this.cachedItem)
  }

  // cria um observable que emite um valor a cada 5 segundos
  private cachedItem = interval(5000).pipe(map(num => ({ data: `numero: ${num}` })))

  sendCount(): Promise<Observable<CountMessage>> {
    // retorna o observable do cache
    return this.cacheManager.get('cached_count')
  }
}
