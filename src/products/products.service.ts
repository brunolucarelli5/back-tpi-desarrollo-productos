import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './../entities/product.entity';
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
        try {
            const product = this.productRepository.create(productDto);
            return await this.productRepository.save(product);
        } catch (error) {
            throw new HttpException(error.message??'Error creando producto', 401);
        }
    }

    async findAllProducts(): Promise<ProductEntity[]> {
        try {
        return await this.productRepository.find({relations:["productType"]});
        } catch (error) {
            throw new HttpException(error.message??'Error No encontrados', 404);
        }
    }

    async findProductById(id: string): Promise<ProductEntity> {
        try { 
            const products = await this.productRepository.find({ where: { id } });
            return products[0]; 
        } catch (error) {
            throw new HttpException(error.message??'Error No encontrado', 404);
        }
    } 

    async updateProduct(id: string, productDto: CreateProductDto): Promise<ProductEntity> {
        try {
            await this.productRepository.update(id, productDto);
            return await this.productRepository.findOne({where:{id}});
        } catch (error) {
            throw new HttpException(error.message??'Error No encontrado',404);
        }
    }

    async deleteProduct(id: string): Promise<void> {
        try {
            await this.productRepository.delete(id);
        } catch (error) {
            throw new HttpException(error.message??'Error No encontrado', 404);
        }
    }

    async createProductType(productTypeDto: CreateProductTypeDto): Promise<ProductTypeEntity> {
        const productType = this.productTypeRepository.create(productTypeDto);
        return await this.productTypeRepository.save(productType);
    }
    
    async findAllProductTypes(): Promise<ProductTypeEntity[]> {
        return await this.productTypeRepository.find();
    }

    async findProductTypeById(id: string): Promise<ProductTypeEntity> {
        return await this.productTypeRepository.findOne({where:{id}});
    }

    async updateProductType(id: string, productTypeDto: CreateProductTypeDto): Promise<ProductTypeEntity> {
        await this.productTypeRepository.update(id, productTypeDto);
        return await this.productTypeRepository.findOne({where:{id}});
    }

    async deleteProductType(id: string): Promise<void> {
        await this.productTypeRepository.delete(id);
    }
}