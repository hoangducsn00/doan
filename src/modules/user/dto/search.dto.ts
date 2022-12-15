import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class SearchDto{
    // @ApiProperty({required:false})
    @ApiPropertyOptional()
    search: string;
}