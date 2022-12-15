import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class  UpdateUserDto{
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    // @ApiProperty()
    // @IsString()
    // @IsNotEmpty()
    // username: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    // @ApiProperty({ type: Role,enum:Role })
    // @IsEnum(Role)
    // @IsNotEmpty()
    // role: Role;
}

