import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"


export class CreateGameDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    des:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    thumnailurl:string

}
