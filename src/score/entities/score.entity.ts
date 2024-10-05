import { Game } from "src/game/entities/game.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Score {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    score:string;

    @ManyToOne(()=>User,(user)=>user.score)
    user:User

    @ManyToOne(()=>Game,(game)=>game.score)   
    game:Game
}
