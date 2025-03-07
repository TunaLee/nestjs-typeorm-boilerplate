import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ErrorHandlingMiddleware } from './middlewares/error-handling.middleware';
import { S3Module } from './modules/s3/s3.module';
import { AppDataSource } from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    AuthModule,
    UsersModule,
    S3Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ErrorHandlingMiddleware).forRoutes('*');
  }
}
