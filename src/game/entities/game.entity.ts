import { Score } from "src/score/entities/score.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Game {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string
    
    @Column()
    des : string

    @Column()
    thumnailurl:string

    @OneToMany(()=>Score,(score)=>score.game)
    score:Score[];


}
