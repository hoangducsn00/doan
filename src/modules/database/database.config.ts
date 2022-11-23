import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { Admin } from '../admin/entity/admin.entity';

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
        // ReceivedMessage,
    ],
    synchronize: true,
    logging: true,
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },

    // dropSchema: true,
};
