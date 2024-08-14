import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AuthController,
  InitialConfigController,
  OrganizationController,
  PermissionsController,
  UserController
} from './controller';

import { ENTITIES_ARRAY } from './entity';

import {
  AuthService,
  OrganizationService,
  PermissionsService,
  UserService
} from './service';

import { DatabaseMiddleware, PermissionsMiddleware } from './middleware';
import { SocketModule } from './socket';
import { ROUTES, ROUTES_INITIAL } from './types';

@Module({
  imports: [
    SocketModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          type: 'postgres',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT, 10),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE, // Banco de dados padrão
          entities: ENTITIES_ARRAY,
          synchronize: true // Para desenvolvimento; em produção, evite usar synchronize
        };
      }
    }),
    TypeOrmModule.forFeature(ENTITIES_ARRAY)
  ],
  controllers: [
    AuthController,
    OrganizationController,
    PermissionsController,
    UserController,
    InitialConfigController
  ],
  providers: [AuthService, OrganizationService, PermissionsService, UserService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DatabaseMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer
      .apply(PermissionsMiddleware)
      .exclude({ path: ROUTES.AUTH, method: RequestMethod.ALL })
      .exclude({
        path: `${ROUTES_INITIAL.INITIAL_CONFIG}/${ROUTES.ORGANIZATION}`,
        method: RequestMethod.ALL
      })
      .exclude({
        path: `${ROUTES_INITIAL.INITIAL_CONFIG}/${ROUTES.USER}`,
        method: RequestMethod.ALL
      })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
