import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from '@/config';
import { LoggingMiddleware } from '@/middleware';
import { AuthModule, FileModule } from '@/module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), AuthModule, FileModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
