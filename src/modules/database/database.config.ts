import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { Admin } from '../admin/entity/admin.entity';
import { User } from '../user/entity/user.entity';

export const defaultConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: +process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    // autoLoadEntities: true,
    entities: [
        Admin,
        User,
        // ReceivedMessage,
    ],
    synchronize: false,
    logging: true,
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },

    // dropSchema: true,
};
