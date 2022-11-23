import { Module } from '@nestjs/common';
import Modules from './modules';
import { AuthController } from './modules/auth/auth.controller';

@Module({
    imports: [
        ...Modules
    ],

    controllers: [AuthController],
})
export class AppModule {}
