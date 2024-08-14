import {
  BadRequestException,
  Injectable,
  NestMiddleware
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { DataSource } from 'typeorm';

import { ENTITIES_ARRAY } from 'src/entity';

dotenv.config();

@Injectable()
export class DatabaseMiddleware implements NestMiddleware {
  private connectionCache: Map<string, DataSource> = new Map(); // Cache para armazenar conexões

  async use(req: Request, res: Response, next: NextFunction) {
    const organizationAcronym = req.headers['organization-acronym'] as string;

    if (!organizationAcronym) {
      throw new BadRequestException('Organization acronym header is missing');
    }

    const databaseName = organizationAcronym.toLowerCase();

    if (this.connectionCache.has(databaseName)) {
      req['dataSource'] = this.connectionCache.get(databaseName);
      return next();
    }

    // Conexão temporária para verificar se o banco de dados existe
    const tempDataSource = new DataSource({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE // Use o banco de dados padrão para conexão temporária
    });

    try {
      await tempDataSource.initialize();

      // Verificar se o banco de dados solicitado existe
      const databaseExists = await tempDataSource.query(
        `SELECT 1 FROM pg_database WHERE datname = $1`,
        [databaseName]
      );

      if (databaseExists.length === 0) {
        throw new BadRequestException(
          `Database not found with name "${databaseName}"`
        );
      }

      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: databaseName,
        entities: ENTITIES_ARRAY,
        synchronize: false // Evitar sincronizar a cada mudança de banco
      });

      await dataSource.initialize();
      this.connectionCache.set(databaseName, dataSource); // Armazenar conexão em cache
      req['dataSource'] = dataSource;
      next();
    } catch (error) {
      console.error(
        `Error initializing connection for database: ${databaseName}`,
        error
      );
      throw new BadRequestException(error.message);
    } finally {
      await tempDataSource.destroy();
    }
  }
}
