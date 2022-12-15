import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorator/roles.decorator';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserService } from './user.service';
import { CreateUserDto, Role } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('user')
@ApiBearerAuth()
@ApiTags('user')
export class UserController{
    constructor(private userService: UserService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto){
        return this.userService.createUser(createUserDto);
    }

    @Get()
    @Roles(Role.User)
    @UseGuards(JWTAuthGuard,RolesGuard)
    async getAllUser(){
        return this.userService.getAllUser();
    }

    @Delete(':id')
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'Id ',
    })
    async deleteUser(@Param('id') id: number){
        return this.userService.deleteUser(id);
    }

    @Patch(':id')
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'Id ',
    })
    async updateUser(@Param('id') id: number,@Body() updateDto : UpdateUserDto){
        return this.userService.updateUser(id,updateDto);
    }
}