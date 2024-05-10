import { Controller, Get, Post, Put, Patch, Delete, Body } from '@nestjs/common';
import { ProductsService } from './products.service';

import { ProductEntity } from 'src/entities/product.entity';

@Controller('products')
export class ProductsController {
    
    constructor(private readonly productsService: ProductsService) {}

        
    @Post() //crear un objeto con @post
    async createProduct(@Body() product: ProductEntity): Promise<ProductEntity> {
        return await this.productsService.createProduct(product);
    }



    

}
