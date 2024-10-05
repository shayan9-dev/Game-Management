import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Game Management')
  .setDescription('The Gaming Management System is a backend solution built with NestJS and PostgreSQL for managing user authentication, game cataloging, score submissions, and real-time leaderboards. It allows users to register, log in, and submit scores after playing games, while admins can manage the game library. The system ensures secure score tracking and provides dynamic leaderboards for each game, fostering competitive gameplay. With a modular API-driven architecture, it integrates easily with any frontend and is designed to be secure, scalable, and efficient, making it ideal for gaming websites like achagames.com.')
  .setVersion('1.0')
  .addTag('Games').
  addBearerAuth({
    type:'http',
    scheme:'bearer',
    bearerFormat:'JWT',
    name:'JWT',
    description:'Enter auth key',
    in:'header'
  },'jwt auth')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
