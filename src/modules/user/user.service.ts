import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { tsTsxJsJsxRegex } from 'ts-loader/dist/constants';
import { User } from './entity/user.entity';
import { CreateUserDto, Role } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {
    }

    async createUser(createUserDto: CreateUserDto) {
        const user = new User();
        user.email = createUserDto.email;
        user.password = createUserDto.password;
        user.username = createUserDto.username;
        user.role = Role.User;
        await this.userRepository.save(user);
    }

    async getAllUser() {
        return this.userRepository.findBy({ role: Role.User });
    }

    async deleteUser(id: number) {
        const user = await this.userRepository.findOneBy({ id: id });
        if (!user) {
            throw new BadRequestException({ message: 'User is not exist' });
        }
        return this.userRepository.delete(id);
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto) {
        const { password, email } = updateUserDto;
        const user = await this.userRepository.findOneBy({ id: id });
        if (!user) {
            throw new BadRequestException({ message: 'User is not exist' });
        }
        if (email) {
            user.email = updateUserDto.email;
        }
        if (password) {
            user.password = updateUserDto.password;
        }
        return this.userRepository.save(user);
    }
}