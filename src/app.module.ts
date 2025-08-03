import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ScoreModule } from './score/score.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true,envFilePath:['.local.env']}),TypeOrmModule.forRootAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
     useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        synchronize: configService.get<boolean>('DATABASE_SYNC'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      })
  }), UserModule, AuthModule, ScoreModule, GameModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
