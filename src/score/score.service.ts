import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { GameService } from 'src/game/game.service';

@Injectable()
export class ScoreService {

  constructor(@InjectRepository(Score) private readonly ScoreRepo: Repository<Score>
    , private userservice: UserService, private gameservice: GameService) { }


  async create(createScoreDto: CreateScoreDto, gameid: number, userid: number) {

    let score: Score = new Score()
    score.score = createScoreDto.score
    score.game = await this.gameservice.findOne(gameid)
    score.user = await this.userservice.findOne(userid)

    return this.ScoreRepo.save(score);
  }

  findAll() {
    return this.ScoreRepo.find();
  }

  findbyuserid(id: number) {
    if(!id){
      throw new BadRequestException('Id must be provided')
    }
    return this.ScoreRepo.find({ relations: ['user'], where: { user: { id: id } } });
  }

  findOne(id: number) {
    if(!id){
      throw new BadRequestException('Id must be provided')
    }
    return this.ScoreRepo.findOne({ where: { id } });
  }

  getleaderboard(id: number) {
    if(!id){
      throw new BadRequestException('Id must be provided')
    }
    return this.ScoreRepo.find({
      relations: ['game'],
      where: { game: { id } },
      order: { score: 'DESC' },
      take: 10
    })

  }
  remove(id: number) {
    if(!id){
      throw new BadRequestException('Id must be provided')
    }
    return this.ScoreRepo.delete(id);
  }
}
