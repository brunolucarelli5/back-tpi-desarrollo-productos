import { Controller, Get, Post, Put, Patch, Delete, Body } from '@nestjs/common';
import { ProductsService } from './products.service';

import { ProductEntity } from 'src/entities/product.entity';
import { ProductTypeEntity } from 'src/entities/productType.entity';

@Controller()
export class ProductsController {
    
    constructor(private readonly productsService: ProductsService) {}
  
    //EJERCICIO 1
    @Post("/products") //crear un objeto con @post
    async createProduct(@Body() product: ProductEntity): Promise<ProductEntity> {
        return await this.productsService.createProduct(product);
    }

    //EJERCICIO 2
    @Post("/products-type")
    async createProductType(productType: ProductTypeEntity): Promise<ProductTypeEntity> {
        return await this.productsService.createProductType(productType);
    }


    @Get("/getProducts")
    async findAll() {
        return await this.productsService.findAll();
    }
 



    

}
