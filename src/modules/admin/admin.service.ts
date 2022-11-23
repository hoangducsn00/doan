import { Injectable } from '@nestjs/common';
import { AdminRepository } from './repository/admin.repository';

@Injectable()
export class AdminService {
    constructor(private adminRepository: AdminRepository) {}
}
