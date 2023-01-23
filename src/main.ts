import { NestFactory } from '@nestjs/core';
import { FreeIconsModule } from './freeicons.module';

async function bootstrap() {
  const app = await NestFactory.create(FreeIconsModule);
  await app.listen(3000);
}
bootstrap();
