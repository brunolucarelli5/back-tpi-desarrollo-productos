import { Injectable } from '@nestjs/common';
import { HttpException} from '@nestjs/common';

import { ProductEntity } from 'src/entities/product.entity';
import { ProductTypeEntity } from 'src/entities/productType.entity';

@Injectable()
export class ProductsService {

    //ACCESO A LAS TABLAS
    repositoryProductEntity = ProductEntity
    repositoryProductTypeEntity = ProductTypeEntity

    //EJERCICIO 1 - Crear products con post
    async createProduct(product: ProductEntity): Promise<ProductEntity> {
        try {
            //Podemos utilizar save porque la entidad ProductEntity
            //extiende a BaseEntity
            //Usamos await para esperar la ejecución del save
            return await this.repositoryProductEntity.save(product)

        } catch {
            throw new HttpException("Solicitud incorrecta - Error creando producto", 400)
        } finally {
            console.log("Terminó la ejecución, product")
        }
    }

    //EJERCICIO 2 - Crear productTypes con post
    async createProductType(productType: ProductTypeEntity): Promise<ProductTypeEntity> {
        try {
            return await this.repositoryProductTypeEntity.save(productType)
        } catch {
            throw new HttpException("Solicitud incorrecta - Error creando producto", 400)
        } finally {
            console.log("Terminó la ejecución productType")
        }
    }

    //Función para el GET, findall
    async findAll(){
        try {
          return await this.repositoryProductEntity.find(); // Devuelve todos los productos
        } catch (error) {
          throw new HttpException('Error finding products', 500);
        }
    }
}