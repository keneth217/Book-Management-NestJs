import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'keneth',
      password: 'korir',
      port: 5432,
      database: 'book-management',
      synchronize: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
    BooksModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
