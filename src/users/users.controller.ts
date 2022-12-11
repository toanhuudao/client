import {
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import UsersService from './interfaces/users.service.interface';

@Controller('users')
export class UsersController implements OnModuleInit {
  private usersService: UsersService;
  constructor(@Inject('USERS_PACKAGE') private client: ClientGrpc) {}
  onModuleInit() {
    this.usersService = this.client.getService<UsersService>('UsersService');
  }

  @Get('/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne({ id });
  }
}
