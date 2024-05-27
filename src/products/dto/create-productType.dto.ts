import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductTypeDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
}
