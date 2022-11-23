import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import ormConfig from './ormconfig';
import { AdminModule } from './modules/admin/admin.module';

const Modules = [
    AuthModule,
    AdminModule,
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
];
export default Modules;
