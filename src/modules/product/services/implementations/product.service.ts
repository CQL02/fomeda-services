import { Inject, Injectable } from "@nestjs/common";
import { IProductService } from "../interfaces/product.service.interface";
import { ProductRepository } from "../../domain/repositories/product.repository";
import { ProductSpecificationRepository } from "../../domain/repositories/product-specification.repository";
import { ProductDto } from "../../dtos/product.dto";
import { ObjectUtils } from "../../../../common/utils/object.utils";
import { ProductErrorConstant, ProductException } from "../../../../common/exception/product.exception";
import { v4 as uuidv4 } from "uuid";
import { StringUtils } from "../../../../common/utils/string.utils";
import { ICategoryService } from "../../../category/services/interfaces/category.service.interface";
import { CategoryService } from "../../../category/services/implementations/category.service";
import { AuthenticationService } from "../../../authentication/services/implementations/authentication.service";
import { ProductMapper } from "../mapper/product.mapper";
import { ProductListFilterDto } from "../../dtos/product-list-filter.dto";
import {
  SubcategorySpecificationService
} from "../../../category/services/implementations/subcategory-specification.service";
import {
  ISubcategorySpecificationService
} from "../../../category/services/interfaces/subcategory-specification.service.interface";
import {
  IAuthenticationService
} from '../../../authentication/services/interfaces/authentication.service.interface';
import { ProductSpecificationDto } from "../../dtos/product-specification.dto";
import { CategoryConstant } from "../../../../common/constant/category.constant";
import { ProductConstant } from "../../../../common/constant/product.constant";

@Injectable()
export class ProductService implements IProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productSpecificationRepository: ProductSpecificationRepository,
    private readonly productMapper: ProductMapper,
    @Inject(CategoryService.name) private readonly categoryService: ICategoryService,
    @Inject(SubcategorySpecificationService.name) private readonly subcategorySpecificationService: ISubcategorySpecificationService,
    @Inject(AuthenticationService.name) private readonly authenticationService: IAuthenticationService  ) {
  }

  async createProduct(productDto: ProductDto): Promise<boolean> {
    if (ObjectUtils.isEmpty(productDto)) {
      throw new ProductException(ProductErrorConstant.INVALID_PRODUCT);
    }

    const _id = uuidv4();
    //TODO: get owner_id
    const owner_id = "cc49f722-7806-4557-96a2-d79bb55b5dd1";
    const product = await this.productRepository.create({ ...productDto, _id, owner_id });

    const specifications = Object.values(productDto.specification).map(spec => ({
      ...spec,
      pro_id: _id,
    }))
    const pro_spec = await this.productSpecificationRepository.createList(specifications);

    return ObjectUtils.isNotEmpty(product) || ObjectUtils.isNotEmpty(pro_spec);
  }

  async getProductById(id: string): Promise<ProductDto> {
    if (StringUtils.isEmpty(id)) {
      throw new ProductException(ProductErrorConstant.PRODUCT_ID_IS_EMPTY);
    }

    const product = await this.productRepository.findOneById(id);
    if (ObjectUtils.isEmpty(product)) {
      throw new ProductException(ProductErrorConstant.PRODUCT_NOT_FOUND);
    }

    const names = await this.categoryService.findNameById(product.subcat_id)
    const subcat_name = names.subcat_name;
    const cat_name = names.cat_name;
    const username = await this.authenticationService.findUserById(product.owner_id).then((r) => r.username);

    const pro_spec = await this.productSpecificationRepository.findAllByFilter({ pro_id: id });
    const pro_spec_dto = this.productMapper.mapSchemaListToDtoList(pro_spec.map(spec => spec.toObject()), ProductSpecificationDto);

    return { ...product.toObject(), specification: pro_spec_dto, subcat_name: subcat_name, owner_username: username, cat_name: cat_name };
  }

  async getProductVerificationDetailsById(id:string): Promise<ProductDto> {
    const product = await this.getProductById(id);

    const subcategory = await this.categoryService.findOneSubcategoryById(product.subcat_id);
    product.rating_score = subcategory.rating_score ?? [];

    const specList = await this.subcategorySpecificationService.findActiveSubcategorySpecificationByCatId(product.subcat_id);
    const specMap = new Map<string, {name: string, rating_score: any[], spec_type: string, prefix: string, suffix: string}>;
    const subspecMap = new Map<string, {name: string, rating_score: any[],  prefix: string, suffix: string}>;

    specList.forEach(spec => {
      specMap.set(spec._id, { name: spec.subcat_spec_name, rating_score: spec.rating_score, spec_type: spec.cat_type, prefix: spec.prefix, suffix: spec.suffix });
      spec.children?.forEach(child => {
        subspecMap.set(child._id, { name: child.subcat_subspec_name, rating_score: child.rating_score, prefix: child.prefix, suffix: child.suffix });
      });
    });

    product.specification.map((spec: any) => {
      spec.spec_name = specMap.get(spec.spec_id).name || "";
      spec.rating_score = specMap.get(spec.spec_id).rating_score || [];
      spec.spec_type = specMap.get(spec.spec_id).spec_type;
      spec.prefix = specMap.get(spec.spec_id).prefix || "";
      spec.suffix = specMap.get(spec.spec_id).suffix || "";
      if(spec.rating_score.length !== 0 && product.status !== ProductConstant.REJECTED){
        spec.score = spec.score ?? this.calculateRecommendScore(spec.spec_desc, spec.rating_score);
      }
      spec.subspecification?.map((subspec: any) => {
        subspec.subspec_name = subspecMap.get(subspec.subspec_id).name || "";
        subspec.rating_score = subspecMap.get(subspec.subspec_id).rating_score || [];
        subspec.prefix = subspecMap.get(subspec.subspec_id).prefix || "";
        subspec.suffix = subspecMap.get(subspec.subspec_id).suffix || "";
        subspec.spec_id = spec.spec_id;
        if(subspec.rating_score.length !== 0 && product.status !== ProductConstant.REJECTED){
          subspec.score = subspec.score ?? this.calculateRecommendScore(subspec.subspec_desc, subspec.rating_score);
        }
      });
    });

    return product;
  }

  private calculateRecommendScore(value: string, ratingScore: any[]): number {
    let maxScore = 0;
    ratingScore.forEach(rating => {
      let score = 0;
      if(rating.action === CategoryConstant.RATING_HAVE_VALUE) {
        score = rating.score;
      } else if(rating.action === CategoryConstant.RATING_CONTAINS){
        score = value.includes(rating.value) ? rating.score : 0;
      } else if(rating.action === CategoryConstant.RATING_EQUAL_TO){
        score = parseInt(value) === parseInt(rating.value) ? rating.score : 0
      } else if (rating.action === CategoryConstant.RATING_MORE_THAN) {
        score = parseInt(value) >= parseInt(rating.value) ? rating.score : 0;
      } else if (rating.action === CategoryConstant.RATING_LESS_THAN) {
        score = parseInt(value) <= parseInt(rating.value) ? rating.score : 0;
      }
      if(score > maxScore) maxScore = score;
    })

    return maxScore;
  }

  async getProductByFilter(productListFilterDto: ProductListFilterDto): Promise<ProductDto[]> {
    //TODO: get owner_id
    const owner_id = "cc49f722-7806-4557-96a2-d79bb55b5dd1";
    productListFilterDto.owner_id = owner_id;

    const productList = await this.productRepository.getProductByFilter(productListFilterDto);
    if (ObjectUtils.isEmpty(productList)) {
      return [];
    }

    const cat_names = await this.categoryService.findAllSubcategoryNameByIds(productListFilterDto.cat_ids ?? []);
    const subcatIdToNameMap = new Map<string, { subcat_name: string, cat_name: string }>();
    cat_names.forEach(cat => {
      if (cat.subcat_id) {
        subcatIdToNameMap.set(cat.subcat_id, {
          subcat_name: cat.subcat_name,
          cat_name: cat.cat_name
        });
      }
    });

    const result = productList.map(product => {
      const subcatData = subcatIdToNameMap.get(product.subcat_id);
      return {
        ...product.toObject(),
        subcat_name: subcatData?.subcat_name || null,
        cat_name: subcatData?.cat_name || null
      };
    });

    return this.productMapper.mapSchemaListToDtoList(result, ProductDto);
  }

  async getProductVerificationDetailsByFilter(productListFilterDto: ProductListFilterDto): Promise<ProductDto[]> {
    const productList = await this.productRepository.getProductByFilter(productListFilterDto);
    if (ObjectUtils.isEmpty(productList)) {
      return [];
    }

    const cat_names = await this.categoryService.findAllSubcategoryNameByIds(productListFilterDto.cat_ids ?? []);
    const subcatIdToNameMap = new Map<string, { subcat_name: string, cat_name: string }>();
    cat_names.forEach(cat => {
      if (cat.subcat_id) {
        subcatIdToNameMap.set(cat.subcat_id, {
          subcat_name: cat.subcat_name,
          cat_name: cat.cat_name
        });
      }
    });

    const adminIds = productList.flatMap(product =>
      product.reviewed_by ? [product.owner_id, product.reviewed_by] : [product.owner_id]
    );
    const userList = await this.authenticationService.findAllUsersByFilter({user_id: {$in: adminIds}});
    const usernameMap = new Map<string, string>();
    userList.forEach(user => usernameMap.set(user.user_id, user.username))

    const result = productList.map(product => {
      const subcatData = subcatIdToNameMap.get(product.subcat_id);
      return {
        ...product.toObject(),
        owner_username: usernameMap.get(product.owner_id),
        admin_username: usernameMap.get(product.reviewed_by),
        subcat_name: subcatData?.subcat_name || null,
        cat_name: subcatData?.cat_name || null
      };
    });

    return this.productMapper.mapSchemaListToDtoList(result, ProductDto);
  }

  async updateProductById(id: string, productDto: ProductDto): Promise<boolean> {
    const product = await this.productRepository.findOneById(id);
    if (ObjectUtils.isEmpty(product)) {
      throw new ProductException(ProductErrorConstant.PRODUCT_NOT_FOUND);
    }

    const updateProduct = await this.productRepository.update(id, productDto);
    const updateProductSpec = await this.productSpecificationRepository.updateProductSpecifications(id, productDto.specification);

    return ObjectUtils.isNotEmpty(updateProduct) && ObjectUtils.isNotEmpty(updateProductSpec);
  }

  async updateProductIsActive(id: string): Promise<boolean> {
    const product = await this.productRepository.findOneById(id);
    if (ObjectUtils.isEmpty(product)) {
      throw new ProductException(ProductErrorConstant.PRODUCT_NOT_FOUND);
    }

    const updateProduct = await this.productRepository.updateOneByFilter({ _id: id }, { is_active: !product.is_active });
    if(ObjectUtils.isEmpty(updateProduct)) {
      throw new ProductException(ProductErrorConstant.FAILED_TO_ACTIVATE);
    }

    return true;
  }

  async updateProductVerificationDetailsById(id:string, productDto:ProductDto): Promise<boolean> {
    console.log(productDto)
    //TODO: get owner_id
    const username = "cc49f722-7806-4557-96a2-d79bb55b5dd1";

    let updateProductData: any = {
      reviewed_on: new Date(),
      reviewed_by: username,
      status: ProductConstant.REJECTED,
      rejected_reason: productDto.rejected_reason ?? null,
    }

    let updateProductSpec = true;
    if(productDto.status === ProductConstant.APPROVED) {
      console.log("run status approved");
      updateProductData = {
        ...updateProductData,
        status: ProductConstant.APPROVED,
        rating: productDto.rating,
        total_score: productDto.total_score,
      }
      updateProductSpec = await this.productSpecificationRepository.updateProductSpecificationsScore(id, productDto.specification);
    }

    const product = await this.productRepository.update(id, updateProductData);

    return ObjectUtils.isNotEmpty(product) && updateProductSpec;
  }

  async deleteProductById(id: string): Promise<boolean> {
    const specResult = await this.productSpecificationRepository.deleteProductSpecificationByProId(id);
    const productResult = await this.productRepository.delete(id);
    return ObjectUtils.isNotEmpty(productResult) && ObjectUtils.isNotEmpty(specResult);
  }
}