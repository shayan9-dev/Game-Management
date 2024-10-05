import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {

  constructor(@InjectRepository(Game) private readonly gameRepo:Repository<Game>){}

  create(createGameDto: CreateGameDto) {

    let game:Game = new Game();
    game.name = createGameDto.name
    game.des = createGameDto.des
    game.thumnailurl = createGameDto.thumnailurl
    return this.gameRepo.save(game);
  }

  findAll() {
    return this.gameRepo.find();
  }

  findOne(id: number) {
    return this.gameRepo.findOne({where:{id}}) ;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    let game:Game = new Game();
    game.name = updateGameDto.name
    game.des = updateGameDto.des
    game.thumnailurl = updateGameDto.thumnailurl
    game.id = id
    return this.gameRepo.save(game);
  }

  remove(id: number) {
    return this.gameRepo.delete(id);
  }
}
