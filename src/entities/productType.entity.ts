import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Not } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity({ name: 'product_types'})
export class ProductTypeEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => ProductEntity, (product) => product.productType)
  products: ProductEntity[];
}
