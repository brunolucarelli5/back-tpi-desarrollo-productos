import { Injectable } from '@nestjs/common';

import { ProductEntity } from 'src/entities/product.entity';
import { HttpException } from '@nestjs/common';

@Injectable()
export class ProductsService {

    repository = ProductEntity

    //Crear objetos con post
    async createProduct(product: ProductEntity): Promise<ProductEntity> {
        try {
            //Podemos utilizar save porque la entidad ProductEntity
            //extiende a BaseEntity
            //Usamos await para esperar la ejecución del save
            return await this.repository.save(product)
        } catch {
            throw new HttpException("Error creando producto", 500)
        } finally {
            console.log("Terminó la ejecución")
        }
    }

}
