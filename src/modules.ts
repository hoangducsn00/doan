import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import ormConfig from './ormconfig';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';

const Modules = [
    AuthModule,
    AdminModule,
    UserModule,
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
];
export default Modules;
