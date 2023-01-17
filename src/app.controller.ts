import { Controller, Get } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/common/cache';
import { Inject } from '@nestjs/common/decorators';
import { Cache } from 'cache-manager';
import { AppService } from './app.service';
import { IProfile } from './shared/models/Profile';

@Controller()
export class AppController {
  fakeValue: string = 'my name is jc';
  fakeModel: IProfile = {
    name: 'joseph',
    email: 'joseph@gmail.com'
  }

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  /**
   * Adding data to redis store
   * @returns object
   */
  @Get('get-string-cache')
  async getSimpleString(){
    let value = await this.cacheManager.get('my-string');

    if(value){
      return{data: value, loadsFrom: 'redis cache'}
    }

    await this.cacheManager.set('my-string', this.fakeValue, 300)
    return {
      data: this.fakeValue,
      loadsFrom: 'fake db'
    }
  }


  /**
   * getting data from redis store 
   * @returns object
   */
  @Get('object-cache')
  async getObject(){
    let profile = await this.cacheManager.get<IProfile>('my-object');

    if(profile){
      return {
        data: profile,
        loadsFrom: 'redis cache'
      }
    }

    await this.cacheManager.set('my-object', this.fakeModel, 300);
    return {
      data: this.fakeModel,
      loadsFrom: 'fake db'
    }
  }

  /**
   * deleting data in redis store
   * @returns string
   */
  @Get('delete')
  async deleteCache(){
    await this.cacheManager.del('my-object')

    return "cache deleted"
  }


    /**
   * resetting all datas in redis store
   * @returns string
   */
    @Get('delete')
    async resetCache(){
      await this.cacheManager.reset()
  
      return "cache reset successfully"
    }
}
