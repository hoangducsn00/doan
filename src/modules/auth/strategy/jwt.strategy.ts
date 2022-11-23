import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { AdminRepository } from '../../admin/repository/admin.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private adminRepository: AdminRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.ACCESS_TOKEN_SECRET,
        });
    }

    async validate(payload: any, done: VerifiedCallback) {
        const admins = await this.adminRepository.find({
            where: { id: payload.id },
            relations: {
                role: true,
            },
            take: 1,
        });
        if (!admins.length) {
            return done(new UnauthorizedException({ message: 'user does not exist' }), false);
        }
        // return { email: payload.email, role: payload.role, id: payload.id };
        return done(null, admins[0]);
    }
}
