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
import {
  CategoryType,
  CategoryTypeSchema,
} from './domain/schema/category-type.schema';
import { CategoryBaseSpecificationRepository } from './domain/repositories/category-base-specification.repository';
import { CategoryGeneralSpecificationRepository } from './domain/repositories/category-general-specification.repository';
import { CategoryGeneralSubspecificationRepository } from './domain/repositories/category-general-subspecification.repository';
import { CategoryBaseSubspecificationRepository } from './domain/repositories/category-base-subspecification.repository';
import { CategoryTypeRepository } from './domain/repositories/category-type.repository';
import { SubcategorySubspecificationRepository } from './domain/repositories/subcategory-subspecification.repository';
import { SubcategorySpecificationRepository } from './domain/repositories/subcategory-specification.repository';
import { SubcategoryRepository } from './domain/repositories/subcategory.repository';
import { SequenceModule } from '../sequence/sequence.module';
import { GeneralSpecificationService } from "./services/implementations/general-specification.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: CategoryBaseSpecification.name, schema: CategoryBaseSpecificationSchema, },
      { name: CategoryBaseSubspecification.name, schema: CategoryBaseSubspecificationSchema, },
      { name: CategoryGeneralSpecification.name, schema: CategoryGeneralSpecificationSchema, },
      { name: CategoryGeneralSubspecification.name, schema: CategoryGeneralSubspecificationSchema, },
      { name: CategoryType.name, schema: CategoryTypeSchema },
      { name: Subcategory.name, schema: SubcategorySchema },
      { name: SubcategorySpecification.name, schema: SubcategorySpecificationSchema, },
      { name: SubcategorySubspecification.name, schema: SubcategorySubspecificationSchema, },
    ]),
    SequenceModule,
  ],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    GeneralSpecificationService,
    CategoryRepository,
    CategoryBaseSpecificationRepository,
    CategoryBaseSubspecificationRepository,
    CategoryGeneralSpecificationRepository,
    CategoryGeneralSubspecificationRepository,
    CategoryTypeRepository,
    SubcategoryRepository,
    SubcategorySpecificationRepository,
    SubcategorySubspecificationRepository,
  ],
})
export class CategoryModule {}
