import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entity/admin.entity';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminRepository } from './repository/admin.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Admin])],
    providers: [AdminService, AdminRepository],
    exports: [AdminService],
    controllers: [AdminController],
})
export class AdminModule {}
