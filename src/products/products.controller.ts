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
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductEntity } from '../entities/product.entity';
import { ProductTypeEntity } from '../entities/productType.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductTypeDto } from './dto/create-productType.dto';
import { AuthGuard } from 'src/middlewares/auth.middleware';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(new AuthGuard('crear-productos'))
  @Post('products')
  @HttpCode(HttpStatus.CREATED)
  async createProduct(
    @Body() productDto: CreateProductDto,
  ): Promise<ProductEntity> {
    return await this.productsService.createProduct(productDto);
  }

  @UseGuards(new AuthGuard('ver-productos'))
  @Get('products')
  @HttpCode(HttpStatus.OK)
  async findAllProducts(): Promise<ProductEntity[]> {
    return await this.productsService.findAllProducts();
  }

  @Get('products/:id')
  @HttpCode(HttpStatus.OK)
  async findProductById(@Param('id') id: string): Promise<ProductEntity> {
    return await this.productsService.findProductById(id);
  }

  @UseGuards(new AuthGuard('editar-productos'))
  @Put('products/:id')
  @HttpCode(HttpStatus.OK)
  async updateProduct(
    @Param('id') id: string,
    @Body() productDto: CreateProductDto,
  ): Promise<ProductEntity> {
    return await this.productsService.updateProduct(id, productDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
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
  @HttpCode(HttpStatus.OK)
  async deleteProductType(@Param('id') id: string): Promise<void> {
    return await this.productsService.deleteProductType(id);
  }

  @Get('/getAll')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.productsService.findAll();
  }
}
