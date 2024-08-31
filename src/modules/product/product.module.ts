import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./domain/schema/product.schema";
import { ProductSpecification, ProductSpecificationSchema } from "./domain/schema/product-specification.schema";
import { ProductController } from "./controllers/product.controller";
import { ProductService } from "./services/implementations/product.service";
import { ProductRepository } from "./domain/repositories/product.repository";
import { ProductSpecificationRepository } from "./domain/repositories/product-specification.repository";
import { CategoryModule } from "../category/category.module";
import { AuthenticationModule } from "../authentication/authentication.module";
import { ProductMapper } from "./services/mapper/product.mapper";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: ProductSpecification.name, schema: ProductSpecificationSchema },
    ]),
    CategoryModule,
    AuthenticationModule,
  ],
  controllers: [ProductController],
  providers: [
    { provide: ProductService.name, useClass: ProductService },
    ProductRepository,
    ProductSpecificationRepository,
    ProductMapper,
  ]
})
export class ProductModule {
}