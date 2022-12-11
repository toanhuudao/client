import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientProxyFactory } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';
import { join } from 'path';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'USERS_PACKAGE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: 'users', // ['hero', 'hero2']
            protoPath: join(__dirname, './users.proto'), // ['./hero/hero.proto', './hero/hero2.proto']
            url: 'localhost:5000',
          },
        });
      },
    },
  ],
})
export class UsersModule {}
