import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductEntity } from '../entities/product.entity';
import { ProductTypeEntity } from './../entities/productType.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductTypeDto } from './dto/create-productType.dto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('products')
  async createProduct(
    @Body() productDto: CreateProductDto,
  ): Promise<ProductEntity> {
    console.log(productDto);
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
  async updateProduct(
    @Param('id') id: string,
    @Body() productDto: CreateProductDto,
  ): Promise<ProductEntity> {
    return await this.productsService.updateProduct(id, productDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<void> {
    return await this.productsService.deleteProduct(id);
  }

  @Post('products-type')
  @HttpCode(HttpStatus.CREATED)
  async createProductType(
    @Body() productTypeDto: CreateProductTypeDto,
  ): Promise<ProductTypeEntity> {
    return await this.productsService.createProductType(productTypeDto);
  }

  @Get('products-type')
  @HttpCode(HttpStatus.OK)
  async findAllProductTypes(): Promise<ProductTypeEntity[]> {
    return await this.productsService.findAllProductTypes();
  }

  @Get('products-type/:id')
  @HttpCode(HttpStatus.OK)
  async findProductTypeById(
    @Param('id') id: string,
  ): Promise<ProductTypeEntity> {
    return await this.productsService.findProductTypeById(id);
  }

  @Put('products-type/:id')
  @HttpCode(HttpStatus.OK)
  async updateProductType(
    @Param('id') id: string,
    @Body() productTypeDto: CreateProductTypeDto,
  ): Promise<ProductTypeEntity> {
    return await this.productsService.updateProductType(id, productTypeDto);
  }

  @Delete('products-types/:id')
  async deleteProductType(@Param('id') id: string): Promise<void> {
    return await this.productsService.deleteProductType(id);
  }

  @Get('/getAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.productsService.findAll();
  }
}
