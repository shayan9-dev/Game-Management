import { forwardRef, Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { GameModule } from 'src/game/game.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([Score]),forwardRef(()=>GameModule),forwardRef(()=>UserModule)],
  controllers: [ScoreController],
  providers: [ScoreService],
  exports:[ScoreService]
})
export class ScoreModule {}
