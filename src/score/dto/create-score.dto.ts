import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class CreateScoreDto {
    @ApiProperty()
    @IsString()
    score:string;
}
