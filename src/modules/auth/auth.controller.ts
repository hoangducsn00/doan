import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { Request } from 'express';
import { GetAccessTokenForm } from './dto/getAccessToken.dto';
import { ResponseAuthDto } from './dto/responseAuth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import {CreateUserDto} from "../user/dto/createUser.dto";

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    @ApiBody({
        type: LoginUserDto,
    })
    @UseGuards(LocalAuthGuard)
    async login(@Req() req: Request): Promise<any> {
        return this.authService.login(req);
    }

    @Post('access-token')
    @ApiBody({
        type: GetAccessTokenForm,
    })
    async getAccessToken(@Body('refreshToken') refreshToken: string): Promise<Partial<ResponseAuthDto>> {
        try {
            return this.authService.getAccessToken(refreshToken);
        } catch (e) {
            throw new Error(e);
        }
    }

    @Post('signup')
    async createUser(@Body() createUserDto: CreateUserDto){
        return this.authService.createUser(createUserDto);
    }
}
