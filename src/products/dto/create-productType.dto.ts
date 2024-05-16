import { IsString } from "class-validator";

export class CreateProductTypeDto {
    @IsString()
    readonly name: string;
}
