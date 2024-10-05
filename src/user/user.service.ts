import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private readonly userRepo:Repository<User> ){}

  async create(createUserDto: CreateUserDto) {
    let user:User = new User()
    user.username = createUserDto.username;
    user.email = createUserDto.email;

    const  salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(createUserDto.password,salt);
    user.password = hashpassword;
    return this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOne({where:{id}});
  }

  findbyemail(email:string){
    return this.userRepo.findOne({where:{email}})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }
}
