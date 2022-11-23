import { defaultConfig } from './modules/database/database.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

const ormConfig = (): TypeOrmModuleOptions => {
    return {
        ...defaultConfig,
        migrationsTableName: 'migrate_tables',
        // Allow both start:prod and start:dev to use migrations
        // __dirname is either dist or src folder, meaning either
        // the compiled js in prod or the ts in dev.
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],

        // cli: {
        //     // location of migration should be inside src folder
        //     // to be compiled into dist/ folder.
        // migrationsDir: 'src/migrations',
        // },
    };
};

export default ormConfig;
