import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';
import { ProductEntity } from './entities/product.entity';
import { ProductTypeEntity } from './entities/productType.entity';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forRoot({
      //Usamos forRoot porque estamos inicializando la base de datos.
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'prueba',
      password: 'prueba',
      database: 'productosdesarrollo',
      synchronize: true,
      entities: [ProductEntity, ProductTypeEntity],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
