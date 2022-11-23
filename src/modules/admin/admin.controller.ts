import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '../auth/constants';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AdminService } from './admin.service';

@Controller('admin')
@ApiBearerAuth()
@ApiTags('admin')
@Roles(Role.SUPER_ADMIN)
@UseGuards(JWTAuthGuard, RolesGuard)
export class AdminController {
    constructor(private adminService: AdminService) {}
}
