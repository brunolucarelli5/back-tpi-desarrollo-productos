import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {ProductTypeEntity} from "./productType.entity";

//Products es el nombre de la tabla
@Entity('products')
export class ProductEntity extends BaseEntity { // extends BaseEntity para poder interactuar con las entidades
                                                // BaseEntity es una clase abstracta que nos da TypeORM para interactuar con las entidades
                                                // Nos aporta métodos como .save() o .reload()
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    price: number;
    
    //Estamos parados en product. Muchos productos conocen a un solo tipo,
    //por lo que especificamos la relación manyToOne. Al final de las funciones
    //flechas, mandamos el puntero products al archivo productType
    @ManyToOne(() => ProductTypeEntity, (productType) => productType.products)
    productType: ProductTypeEntity;
}