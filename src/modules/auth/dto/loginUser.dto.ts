import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LoginUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @Expose()
    readonly email: string;

    @ApiProperty()
    @IsString()
    @Expose()
    @IsNotEmpty()
    readonly password: string;
}
