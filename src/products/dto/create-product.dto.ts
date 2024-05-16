import { Transform } from 'class-transformer';
import {
  IsNumber,
  IsPositive,
  IsString,
  IsInt,
  Validate,
  ValidateNested,
} from 'class-validator';
import { ProductTypeEntity } from 'src/entities/productType.entity';
export class CreateProductDto {
  @IsString()
  readonly name: string;
  @IsNumber()
  readonly price: number;
  @Transform(({ value }) => new IdDTO(value), { toClassOnly: true })
  @ValidateNested() // Valida el objeto ProductTypeEntity, de acuerdo a la clase
  productType: ProductTypeEntity;
}

class IdDTO {
  constructor(id: number) {
    this.id = id;
  }
  @IsNumber()
  id: number;
}
