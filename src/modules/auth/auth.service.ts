import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ResponseAuthDto } from './dto/responseAuth.dto';
import { Admin } from '../admin/entity/admin.entity';
import { User } from '../user/entity/user.entity';
import { UserRepository } from '../user/repository/user.repository';

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
            throw new BadRequestException({ message: 'user is not exist' });
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
}
