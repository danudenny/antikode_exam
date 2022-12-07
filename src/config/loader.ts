import * as dotEnvExtended from 'dotenv-extended';
import * as dotEnvParseVariables from 'dotenv-parse-variables';
import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const fileEnvs = dotEnvExtended.load({
  errorOnMissing: true,
});

const osEnvs = dotEnvParseVariables(
  dotEnvExtended.load({
    includeProcessEnv: true,
    overrideProcessEnv: false,
  }),
);

const envs: any = {};
for (const key of Object.keys(fileEnvs)) {
  envs[key] = osEnvs[key];
}

export class LoaderEnv {
  public static envs = envs;

  public static getTypeOrmConfig(): TypeOrmModuleOptions {
    let config: PostgresConnectionOptions = {
      type: 'postgres',
      cli: {
        migrationsDir: 'src/migrations',
      },
      entities: [path.join(__dirname, '../', '**/*.entity{.ts,.js}')],
      migrationsTableName: 'typeorm_migrations',
      migrations: [path.join(__dirname, '../', 'migrations/*.ts')],
    };

    const ssl = LoaderEnv.envs.POSTGRES_USE_SSL || false;
    const dbMaster = {
      host: envs.POSTGRES_HOST,
      port: envs.POSTGRES_PORT,
      username: envs.POSTGRES_USER,
      password: envs.POSTGRES_PASSWORD,
      database: envs.POSTGRES_DATABASE,
      ssl,
    };

    return Object.assign(dbMaster, config);
  }
}
