import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: 'http://localhost:5173', 
    methods: 'GET,POST', 
    allowedHeaders: 'Content-Type', 
  });
  await app.listen(3000, () => {
    console.log("Сервер зарустился на порту")
  });
}
bootstrap();
