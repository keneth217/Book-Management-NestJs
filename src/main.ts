import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });
  // Set global prefix for all routes
  app.setGlobalPrefix('api');

  // Optionally enable CORS if needed
  app.enableCors();
  app.use(
    session({
      secret: 'kefefewfhg4rhgienv',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
