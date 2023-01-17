import { CacheModule, Module } from '@nestjs/common';
import {redisStore} from 'cache-manager-redis-store';
import { async } from 'rxjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    CacheModule.register({
      //@ts-ignore
      store: redisStore,
      host: 'localhost',
      port: 6379
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
