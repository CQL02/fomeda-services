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
import { ProductVerification, ProductVerificationSchema } from "./domain/schema/product-verification.schema";
import {
  ProductVerificationSpecification,
  ProductVerificationSpecificationSchema
} from "./domain/schema/product-verification-specification.schema";
import { ProductVerificationRepository } from "./domain/repositories/product-verification.respository";
import {
  ProductVerificationSpecificationRepository
} from "./domain/repositories/product-verification-specification.repository";
import { ConsumerService } from "./services/implementations/consumer.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: ProductSpecification.name, schema: ProductSpecificationSchema },
      { name: ProductVerification.name, schema: ProductVerificationSchema },
      { name: ProductVerificationSpecification.name, schema: ProductVerificationSpecificationSchema }
    ]),
    CategoryModule,
    AuthenticationModule
  ],
  controllers: [ProductController],
  providers: [
    { provide: ProductService.name, useClass: ProductService },
    { provide: ConsumerService.name, useClass: ConsumerService },
    ProductRepository,
    ProductSpecificationRepository,
    ProductVerificationRepository,
    ProductVerificationSpecificationRepository,
    ProductMapper
  ]
})
export class ProductModule {
}