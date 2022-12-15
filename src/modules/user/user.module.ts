import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService,UserRepository],
    exports: [UserService],
    controllers: [UserController],
})
export class UserModule {
}