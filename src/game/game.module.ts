import { forwardRef, Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { ScoreModule } from 'src/score/score.module';


@Module({
  imports:[TypeOrmModule.forFeature([Game]),forwardRef(()=>ScoreModule)],
  controllers: [GameController],
  providers: [GameService],
  exports:[GameService]
})
export class GameModule {}
