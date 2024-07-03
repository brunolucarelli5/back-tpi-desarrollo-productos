import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProductTypeEntity } from './productType.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => ProductTypeEntity, (productType) => productType.products)
  productType: ProductTypeEntity;
}
