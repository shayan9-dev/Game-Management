import { Score } from "src/score/entities/score.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('Users')
export class User {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username:string

    @Column()
    email:string

    @Column()
    password:string

    @Column({default:'gamer'})
    role:string

    @OneToMany(()=>Score,(score)=>score.user)
    score:Score[]
}
