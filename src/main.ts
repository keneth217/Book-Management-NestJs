import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });
  // Set global prefix for all routes
  app.setGlobalPrefix('api');

  // Optionally enable CORS if needed
  app.enableCors();
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
