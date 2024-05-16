import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './../entities/product.entity';
import { ProductTypeEntity } from './../entities/productType.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductTypeDto } from './dto/create-productType.dto';
import { json } from 'stream/consumers';
@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        @InjectRepository(ProductTypeEntity)
        private readonly productTypeRepository: Repository<ProductTypeEntity>,
    ) {}

    async createProduct(productDto: CreateProductDto): Promise<ProductEntity> {
        const product = this.productRepository.create(productDto);
        return await this.productRepository.save(product);
    }

    async findAllProducts(): Promise<ProductEntity[]> {
        return await this.productRepository.find();
    }

    async findProductById(id: string): Promise<ProductEntity> {
        const products = await this.productRepository.find({ where: { id } });
        return products[0]; // Return the first element of the array
    }
    

    async updateProduct(id: string, productDto: CreateProductDto): Promise<ProductEntity> {
        await this.productRepository.update(id, productDto);
        return await this.productRepository.find({ where: { id } })[0];
    }

    async deleteProduct(id: string): Promise<void> {
        await this.productRepository.delete(id);
    }

    async createProductType(productTypeDto: CreateProductTypeDto): Promise<ProductTypeEntity> {
        const productType = this.productTypeRepository.create(productTypeDto);
        return await this.productTypeRepository.save(productType);
    }

    async findAllProductTypes(): Promise<ProductTypeEntity[]> {
        return await this.productTypeRepository.find();
    }

    async findProductTypeById(id: string): Promise<ProductTypeEntity> {
        const productType = await this.productTypeRepository.find({where:{id}});
        return productType[0];
    }

    async updateProductType(id: string, productTypeDto: CreateProductTypeDto): Promise<ProductTypeEntity> {
        await this.productTypeRepository.update(id, productTypeDto);
        return await this.productTypeRepository.find({where:{id}})[0];
    }

    async deleteProductType(id: string): Promise<void> {
        await this.productTypeRepository.delete(id);
    }
}