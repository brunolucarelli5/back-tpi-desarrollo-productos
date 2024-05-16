import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductEntity } from './../entities/product.entity';

@Entity()
export class ProductTypeEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @OneToMany(() => ProductEntity, product => product.productType)
    products: ProductEntity[];
}
