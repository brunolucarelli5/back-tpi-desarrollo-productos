import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { BaseEntity } from "typeorm";

@Entity("products") //Products es el nombre de la tabla
export class ProductTypeEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;

    @OneToMany( () => ProductEntity, (product) => product.productType)
    products: ProductEntity[];
}