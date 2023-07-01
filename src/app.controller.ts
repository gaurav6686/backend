import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersListReq, UsersListRes } from './Model/UserListReq';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  //listing API call

  @Get('list')
  public async getUsersList(
    @Body() usersListFilter: UsersListReq,
  ): Promise<UsersListRes> {
    return this.appService.getUsersList(usersListFilter);
  }

}
