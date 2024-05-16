import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductEntity } from './../entities//product.entity';
import { ProductTypeEntity } from './../entities/productType.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductTypeDto } from './dto/create-productType.dto';

@Controller()
export class ProductsController {
    
    constructor(private readonly productsService: ProductsService) {}


    //EJERCICIO 1 - Crear un producto
    @Post('products')
    @HttpCode(HttpStatus.CREATED)
    async createProduct(@Body() productDto: CreateProductDto): Promise<ProductEntity> {
        return await this.productsService.createProduct(productDto);
    }

    //EJERCICIO 7 - Obtener todos los productos
    @Get('products')
    @HttpCode(HttpStatus.OK)
    async findAllProducts(): Promise<ProductEntity[]> {
        return await this.productsService.findAllProducts();
    }

    //EJERCICIO 3 - Obtener un Producto
    @Get('products/:id')
    @HttpCode(HttpStatus.OK)
    async findProductById(@Param('id') id: string): Promise<ProductEntity> {
        return await this.productsService.findProductById(id);
    }

    //EJERCICIO 5 - Actualizar un producto
    @Put('products/:id')
    @HttpCode(HttpStatus.OK)
    async updateProduct(@Param('id') id: string, @Body() productDto: CreateProductDto): Promise<ProductEntity> {
        return await this.productsService.updateProduct(id, productDto);
    }

    //ELIMINAR PRODUCTOS
    @Delete('/products/:id')
    @HttpCode(HttpStatus.OK)
    async deleteProduct(@Param('id') id: string): Promise<void> {
        return await this.productsService.deleteProduct(id);
    }

    //EJERCICIO 2 - Crear un Tipo de Producto
    @Post('products-type')
    async createProductType(@Body() productTypeDto: CreateProductTypeDto): Promise<ProductTypeEntity> {
        return await this.productsService.createProductType(productTypeDto);
    }

    //EJERCICIO 8 - Obtener todos los tipos de productos
    @Get('products-type')
    async findAllProductTypes(): Promise<ProductTypeEntity[]> {
        return await this.productsService.findAllProductTypes();
    }

    //EJERCICIO 4 - Obtener un tipo de producto
    @Get('products-type/:id')
    async findProductTypeById(@Param('id') id: string): Promise<ProductTypeEntity> {
        return await this.productsService.findProductTypeById(id);
    }

    //EJERCICIO 6 - Actualizar un tipo de producto
    @Put('products-type/:id')
    async updateProductType(@Param('id') id: string, @Body() productTypeDto: CreateProductTypeDto): Promise<ProductTypeEntity> {
        return await this.productsService.updateProductType(id, productTypeDto);
    }

    //ELIMINAR UN TIPO DE PRODUCTO
    @Delete('products-type/:id')
    async deleteProductType(@Param('id') id: string): Promise<void> {
        return await this.productsService.deleteProductType(id);
    }

}