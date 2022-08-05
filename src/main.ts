// 라이브러리 등록
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

// 모듈 등록
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(process.env.PORT);
}
bootstrap();
