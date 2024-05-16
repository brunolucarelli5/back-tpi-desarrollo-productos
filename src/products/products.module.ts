import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { ProductTypeEntity } from 'src/entities/productType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, ProductTypeEntity]),],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
