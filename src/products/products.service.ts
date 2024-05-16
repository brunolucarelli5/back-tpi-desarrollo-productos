import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { ProductTypeEntity } from './../entities/productType.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductTypeDto } from './dto/create-productType.dto';
import { HttpException } from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(ProductTypeEntity)
    private readonly productTypeRepository: Repository<ProductTypeEntity>,
  ) {}

  async createProduct(productDto: CreateProductDto): Promise<ProductEntity> {
    return await this.productRepository.save(productDto);
  }

  async findAllProducts(): Promise<ProductEntity[]> {
    return await this.productRepository.find({relations: ['productType']});
  }

  async findProductById(id: string): Promise<ProductEntity> {
    const products = await this.productRepository.find({ where: { id } });
    return products[0];
  }

  async updateProduct(
    id: string,
    productDto: CreateProductDto,
  ): Promise<ProductEntity> {
    await this.productRepository.update(id, productDto);
    return await this.productRepository.findOne({ where: { id } });
  }

  async deleteProduct(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }

  async createProductType(
    productTypeDto: CreateProductTypeDto,
  ): Promise<ProductTypeEntity> {
    try {
      const productType = this.productTypeRepository.create(productTypeDto);
      return await this.productTypeRepository.save(productType);
    } catch (error) {
      throw new HttpException(error.message ?? 'Error creando producto', 400);
    }
  }

  async findAllProductTypes(): Promise<ProductTypeEntity[]> {
    try {
      return await this.productTypeRepository.find();
    } catch (error) {
      throw new HttpException(
        error.message ?? 'Error finding product types',
        404,
      ); // 404: Not Found
    }
  }

  async findProductTypeById(id: string): Promise<ProductTypeEntity> {
    try {
      return await this.productTypeRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException(
        error.message ?? 'Error finding product type',
        404,
      );
    }
  }

  async updateProductType(
    id: string,
    productTypeDto: CreateProductTypeDto,
  ): Promise<ProductTypeEntity> {
    try {
      await this.productTypeRepository.update(id, productTypeDto);
      return await this.productTypeRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException(
        error.message ?? 'Error updating product type',
        404,
      );
    }
  }

  async deleteProductType(id: string): Promise<void> {
    await this.productTypeRepository.delete(id);
  }

  async findAll() {
    try {
      return await this.productTypeRepository.find(); // Devuelve todos los productos
    } catch (error) {
      throw new HttpException(error.message ?? 'Error finding products', 500);
    }
  }
}
