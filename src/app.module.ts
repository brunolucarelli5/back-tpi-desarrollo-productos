import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';
import { SeedsService } from './seeds/seeds.service';

@Module({
  imports: [ProductsModule, TypeOrmModule.forRoot({
    //Usamos forRoot porque estamos inicializando la base de datos.
    //Como es SQLITE es este formato, si fuera postgres sería otro
    type: 'sqlite',
    database: 'ProductsRepository.db',
    entities: entities,
    synchronize: true, //busca cambios en la DB cada que prendamos la app
  })],
  controllers: [AppController],
  providers: [AppService, SeedsService],
})
export class AppModule {}
