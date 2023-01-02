import {
  ValidationPipe,
  ValidationError,
  UnprocessableEntityException,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory(errors: ValidationError[]) {
        return new UnprocessableEntityException(errors);
      },
    }),
  );
  app.use(cors());
  app.enableCors({
    origin: 'https://127.0.0.1:8080'
  })

  await app.listen(process.env.port, () => {
    console.log(`DAOS app listening on port ${process.env.port}`);
  });
}
bootstrap();
