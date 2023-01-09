import {BadRequestException, ForbiddenException, Injectable, UnauthorizedException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {Request} from 'express';
import {JwtService} from '@nestjs/jwt';
import {ResponseAuthDto} from './dto/responseAuth.dto';
import {User} from '../user/entity/user.entity';
import {UserRepository} from '../user/repository/user.repository';
import {CreateUserDto, Role} from "../user/dto/createUser.dto";

@Injectable()
export class AuthService {
    private refreshTokenConfig = {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        secret: process.env.REFRESH_TOKEN_SECRET,
    };

    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string): Promise<Partial<User>> {
        const user = await this.userRepository.findOneBy({ username: username });
        if (!user) {
            throw new BadRequestException({ message: 'User is not exist' });
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            throw new ForbiddenException({ message: 'Password was wrong' });
        }
        return user;
    }


    async login(req: Request): Promise<any> {
        const user: Partial<User> = req.user;
        const payload = { email: user.email, id: user.id,role : user.role};
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, this.refreshTokenConfig),
        };
    }

    async getAccessToken(refreshToken: string): Promise<Partial<ResponseAuthDto>> {
        let refreshTokenDecode;
        try {
            refreshTokenDecode = await this.jwtService.verify(refreshToken, this.refreshTokenConfig);
        } catch (e) {
            throw new UnauthorizedException({ message: 'INVALID_TOKEN' });
        }
        return {
            access_token: this.jwtService.sign(refreshTokenDecode),
        };
    }

    async createUser(createUserDto: CreateUserDto) {
        const user = new User();
        user.email = createUserDto.email;
        user.password = createUserDto.password;
        user.username = createUserDto.username;
        user.role = Role.User;
        const checkUsername = await this.userRepository.findOneBy({username: user.username});
        const checkEmail = await this.userRepository.findOneBy({email: user.email});
        if (checkUsername) {
            throw new BadRequestException({message: 'Username already exists'});
        }
        if (checkEmail) {
            throw new BadRequestException({message: 'Email already exists'});
        }
        await this.userRepository.save(user);
    }
}
