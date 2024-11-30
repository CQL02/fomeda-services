import { IConsumerService } from "../interfaces/consumer.service.interface";
import { ProductDto } from "../../dtos/product.dto";
import { Inject, Injectable } from "@nestjs/common";
import { ProductRepository } from "../../domain/repositories/product.repository";
import { ProductSpecificationRepository } from "../../domain/repositories/product-specification.repository";
import { CategoryService } from "../../../category/services/implementations/category.service";
import { ICategoryService } from "../../../category/services/interfaces/category.service.interface";
import {
  SubcategorySpecificationService
} from "../../../category/services/implementations/subcategory-specification.service";
import {
  ISubcategorySpecificationService
} from "../../../category/services/interfaces/subcategory-specification.service.interface";
import { ProductService } from "./product.service";
import { IProductService } from "../interfaces/product.service.interface";
import { ConsumerProductFilterDto } from "../../dtos/consumer-product-filter.dto";
import { SubcategorySpecificationDto } from "../../../category/dtos/subcategory-specification.dto";
import { ProductMapper } from "../mapper/product.mapper";
import { ObjectUtils } from "../../../../common/utils/object.utils";
import { ProductErrorConstant, ProductException } from "../../../../common/exception/product.exception";

@Injectable()
export class ConsumerService implements IConsumerService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productSpecificationRepository: ProductSpecificationRepository,
    private readonly productMapper: ProductMapper,
    @Inject(ProductService.name) private readonly productService: IProductService,
    @Inject(CategoryService.name) private readonly categoryService: ICategoryService,
    @Inject(SubcategorySpecificationService.name) private readonly subcategorySpecificationService: ISubcategorySpecificationService
  ) {
  }

  async getConsumerComparedProduct(subcat_id: string, ids: string[]): Promise<ProductDto[]> {
    if(ids.length <= 1 || !Array.isArray(ids)) {
      throw new ProductException(ProductErrorConstant.MINIMUM_PRODUCT_NOT_ARCHIVED);
    }

    const specList = await this.subcategorySpecificationService.findActiveSubcategorySpecificationByCatId(subcat_id);
    const { specMap, subspecMap } = this.getSpecMaps(specList);

    const products = Promise.all(ids.map(async (id) => {
      const result = await this.productService.getProductDetailsById(id);
      if (result.specification) {
        result.specification.map((spec) => {
          const currentSpec = specMap.get(spec.spec_id);
          spec.spec_name = currentSpec.name;
          spec.spec_type = currentSpec.spec_type;
          spec.prefix = currentSpec.prefix;
          spec.suffix = currentSpec.suffix;

          if(spec.subspecification) {
            spec.subspecification.map(subspec => {
              const currentSubspec = subspecMap.get(subspec.subspec_id);
              subspec.subspec_name = currentSubspec.name;
              subspec.prefix = currentSubspec.prefix;
              subspec.suffix = currentSubspec.suffix;
            })
          }
        });
      }
      return result;
    }));
    return products;
  }

  async getConsumerProductByFilter(filter: ConsumerProductFilterDto, skip: number, limit: number): Promise<{
    products: ProductDto[],
    total: number
  }> {
    return await this.productRepository.getConsumerProductByFilter(filter, skip, limit);
  }

  async getConsumerSpecificationFilterBySubcatId(subcat_id: string): Promise<ConsumerProductFilterDto> {

    const specList = await this.subcategorySpecificationService.findActiveSubcategorySpecificationByCatId(subcat_id);
    const { specMap, subspecMap } = this.getSpecMaps(specList);

    const specIds = specList.map(spec => spec._id);
    const proSpecList = await this.productSpecificationRepository.findAllByFilter({ spec_id: { $in: specIds } });


    const result: ConsumerProductFilterDto = {
      specification: [],
      subspecification: []
    };

    // manage specification
    proSpecList.forEach(currentSpec => {
      const existingSpec = result.specification.find(item => item.spec_id === currentSpec.spec_id);

      if (existingSpec) {
        if (!existingSpec.desc_list.includes(currentSpec.spec_desc)) {
          existingSpec.desc_list.push(currentSpec.spec_desc);
        }
      } else {
        const specData = specMap.get(currentSpec.spec_id);
        result.specification.push({
          spec_id: currentSpec.spec_id,
          spec_name: specData.name,
          spec_type: specData.spec_type,
          field_type: specData.field_type,
          prefix: specData.prefix,
          suffix: specData.suffix,
          desc_list: [currentSpec.spec_desc]
        });
      }

      // manage subspecificaiton
      currentSpec.subspecification?.forEach(subspec => {
        const exisitingSubspec = result.subspecification.find(item => item.subspec_id === subspec.subspec_id);

        if (exisitingSubspec) {
          if (!exisitingSubspec.desc_list.includes(subspec.subspec_desc)) {
            exisitingSubspec.desc_list.push(subspec.subspec_desc);
          }
        } else {
          const subspecData = subspecMap.get(subspec.subspec_id);
          result.subspecification.push({
            spec_id: currentSpec.spec_id,
            subspec_id: subspec.subspec_id,
            subspec_name: subspecData.name,
            field_type: subspecData.field_type,
            prefix: subspecData.prefix,
            suffix: subspecData.suffix,
            desc_list: [subspec.subspec_desc]
          });
        }
      });
    });

    return result;
  }

  private getSpecMaps(specList: SubcategorySpecificationDto[]) {
    const specMap = new Map<string, any>();
    const subspecMap = new Map<string, any>();

    specList.forEach(spec => {
      specMap.set(spec._id, {
        name: spec.subcat_spec_name,
        spec_type: spec.cat_type,
        field_type: spec.field_type,
        prefix: spec.prefix,
        suffix: spec.suffix
      });

      spec.children?.forEach(child => {
        subspecMap.set(child._id, {
          name: child.subcat_subspec_name,
          field_type: spec.field_type,
          prefix: child.prefix,
          suffix: child.suffix
        });
      });
    });

    return { specMap, subspecMap };
  }

  async getProductDetails(id: string): Promise<ProductDto> {
    const product = await this.productService.getProductDetailsById(id);
    if(ObjectUtils.isEmpty(product)) {
      throw new ProductException(ProductErrorConstant.PRODUCT_NOT_FOUND)
    }

    const specList = await this.subcategorySpecificationService.findActiveSubcategorySpecificationByCatId(product.subcat_id);
    const { specMap, subspecMap } = this.getSpecMaps(specList);

    if(product.specification){
      product.specification.map((spec) => {
        const specData = specMap.get(spec.spec_id)
        spec.spec_name = specData.name;
        spec.spec_type = specData.spec_type;
        spec.prefix = specData.prefix;
        spec.suffix = specData.suffix;

        if(spec.subspecification){
          spec.subspecification.map((subspec) => {
            const subspecData = subspecMap.get(subspec.subspec_id);
            subspec.subspec_name = subspecData.name;
            subspec.prefix = subspecData.prefix;
            subspec.suffix = subspecData.suffix;
          })
        }
      })
    }

    return product;
  }

}