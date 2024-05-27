import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProductTypeEntity } from 'src/entities/productType.entity';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @Transform(({ value }) => new IdDTO(value), { toClassOnly: true })
  @ValidateNested() // Valida el objeto ProductTypeEntity, de acuerdo a la clase
  @IsNotEmpty()
  productType: ProductTypeEntity;
}

class IdDTO {
  constructor(id: number) {
    this.id = id;
  }
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
