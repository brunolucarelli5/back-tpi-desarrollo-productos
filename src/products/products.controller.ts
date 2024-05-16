import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductEntity } from './../entities//product.entity';
import { ProductTypeEntity } from './../entities/productType.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductTypeDto } from './dto/create-productType.dto';

@Controller()
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post('products')
    async createProduct(@Body() productDto: CreateProductDto): Promise<ProductEntity> {
        return await this.productsService.createProduct(productDto);
    }

    @Get('products')
    async findAllProducts(): Promise<ProductEntity[]> {
        return await this.productsService.findAllProducts();
    }

    @Get('products/:id')
    async findProductById(@Param('id') id: string): Promise<ProductEntity> {
        return await this.productsService.findProductById(id);
    }

    @Put('products/:id')
    async updateProduct(@Param('id') id: string, @Body() productDto: CreateProductDto): Promise<ProductEntity> {
        return await this.productsService.updateProduct(id, productDto);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string): Promise<void> {
        return await this.productsService.deleteProduct(id);
    }

    @Post('products-type')
    async createProductType(@Body() productTypeDto: CreateProductTypeDto): Promise<ProductTypeEntity> {
        return await this.productsService.createProductType(productTypeDto);
    }

    @Get('products-type')
    async findAllProductTypes(): Promise<ProductTypeEntity[]> {
        return await this.productsService.findAllProductTypes();
    }

    @Get('products-type/:id')
    async findProductTypeById(@Param('id') id: string): Promise<ProductTypeEntity> {
        return await this.productsService.findProductTypeById(id);
    }

    @Put('products-type/:id')
    async updateProductType(@Param('id') id: string, @Body() productTypeDto: CreateProductTypeDto): Promise<ProductTypeEntity> {
        return await this.productsService.updateProductType(id, productTypeDto);
    }

    @Delete('types/:id')
    async deleteProductType(@Param('id') id: string): Promise<void> {
        return await this.productsService.deleteProductType(id);
    }
}
