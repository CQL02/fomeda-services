import { Module } from '@nestjs/common';
import { CategoryService } from './services/implementations/category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './domain/schema/category.schema';
import { CategoryRepository } from './domain/repositories/category.repository';
import { CategoryController } from './controllers/category.controller';
import {
  Subcategory,
  SubcategorySchema,
} from './domain/schema/subcategory.schema';
import {
  SubcategorySpecification,
  SubcategorySpecificationSchema,
} from './domain/schema/subcategory-specification.schema';
import {
  SubcategorySubspecification,
  SubcategorySubspecificationSchema,
} from './domain/schema/subcategory-subspecification.schema';
import {
  CategoryBaseSpecification,
  CategoryBaseSpecificationSchema,
} from './domain/schema/category-base-specification.schema';
import {
  CategoryBaseSubspecification,
  CategoryBaseSubspecificationSchema,
} from './domain/schema/category-base-subspecification.schema';
import {
  CategoryGeneralSpecification,
  CategoryGeneralSpecificationSchema,
} from './domain/schema/category-general-specification.schema';
import {
  CategoryGeneralSubspecification,
  CategoryGeneralSubspecificationSchema,
} from './domain/schema/category-general-subspecification.schema';
import { CategoryBaseSpecificationRepository } from './domain/repositories/category-base-specification.repository';
import { CategoryGeneralSpecificationRepository } from './domain/repositories/category-general-specification.repository';
import { CategoryGeneralSubspecificationRepository } from './domain/repositories/category-general-subspecification.repository';
import { CategoryBaseSubspecificationRepository } from './domain/repositories/category-base-subspecification.repository';
import { SubcategorySubspecificationRepository } from './domain/repositories/subcategory-subspecification.repository';
import { SubcategorySpecificationRepository } from './domain/repositories/subcategory-specification.repository';
import { SubcategoryRepository } from './domain/repositories/subcategory.repository';
import { SequenceModule } from '../sequence/sequence.module';
import { GeneralSpecificationService } from "./services/implementations/general-specification.service";
import { BaseSpecificationService } from "./services/implementations/base-specification.service";
import { SubcategorySpecificationService } from "./services/implementations/subcategory-specification.service";
import { CategoryMapper } from "./services/mapper/category.mapper";
import { AuthenticationModule } from "../authentication/authentication.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: CategoryBaseSpecification.name, schema: CategoryBaseSpecificationSchema, },
      { name: CategoryBaseSubspecification.name, schema: CategoryBaseSubspecificationSchema, },
      { name: CategoryGeneralSpecification.name, schema: CategoryGeneralSpecificationSchema, },
      { name: CategoryGeneralSubspecification.name, schema: CategoryGeneralSubspecificationSchema, },
      { name: Subcategory.name, schema: SubcategorySchema },
      { name: SubcategorySpecification.name, schema: SubcategorySpecificationSchema, },
      { name: SubcategorySubspecification.name, schema: SubcategorySubspecificationSchema, },
    ]),
    SequenceModule,
    AuthenticationModule,
  ],
  controllers: [CategoryController],
  exports: [CategoryService.name, SubcategorySpecificationService.name],
  providers: [
    { provide: CategoryService.name, useClass: CategoryService },
    { provide: GeneralSpecificationService.name, useClass: GeneralSpecificationService },
    { provide: BaseSpecificationService.name, useClass: BaseSpecificationService },
    { provide: SubcategorySpecificationService.name, useClass: SubcategorySpecificationService },
    CategoryRepository,
    CategoryBaseSpecificationRepository,
    CategoryBaseSubspecificationRepository,
    CategoryGeneralSpecificationRepository,
    CategoryGeneralSubspecificationRepository,
    SubcategoryRepository,
    SubcategorySpecificationRepository,
    SubcategorySubspecificationRepository,
    CategoryMapper,
  ],
})
export class CategoryModule {}
