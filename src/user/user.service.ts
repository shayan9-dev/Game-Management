import { BadRequestException, Injectable } from '@nestjs/common';
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
    
    const newuser = this.userRepo.save(user);
    if(!newuser){
      return new BadRequestException()
    }
    return newuser;
  }

  findAll() {
    const user =this.userRepo.find();
    if(!user){
      return new BadRequestException('No user Found')
    }
    return user;
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
