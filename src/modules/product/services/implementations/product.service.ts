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
import { ProductVerificationRepository } from "../../domain/repositories/product-verification.respository";
import {
  ProductVerificationSpecificationRepository
} from "../../domain/repositories/product-verification-specification.repository";
import { SubcategorySpecificationDto } from "../../../category/dtos/subcategory-specification.dto";
import { Request } from "express";

@Injectable()
export class ProductService implements IProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productSpecificationRepository: ProductSpecificationRepository,
    private readonly productVerificationRepository: ProductVerificationRepository,
    private readonly productVerificationSpecificationRepository: ProductVerificationSpecificationRepository,
    private readonly productMapper: ProductMapper,
    @Inject(CategoryService.name) private readonly categoryService: ICategoryService,
    @Inject(SubcategorySpecificationService.name) private readonly subcategorySpecificationService: ISubcategorySpecificationService,
    @Inject(AuthenticationService.name) private readonly authenticationService: IAuthenticationService  ) {
  }

  // Product
  async createProduct(productDto: ProductDto): Promise<boolean> {
    if (ObjectUtils.isEmpty(productDto)) {
      throw new ProductException(ProductErrorConstant.INVALID_PRODUCT);
    }

    const productSearch = await this.productRepository.findOneById(productDto.pro_id);
    if (ObjectUtils.isNotEmpty(productSearch)) {
      return await this.updateProductDetailsById(productDto.pro_id, productDto);
    }

    const product = await this.productRepository.create({ ...productDto, _id: productDto.pro_id });
    const specifications = Object.values(productDto.specification).map(spec => ({
      ...spec,
      pro_id: productDto.pro_id
    }));
    const pro_spec = await this.productSpecificationRepository.createList(specifications);

    return ObjectUtils.isNotEmpty(product) || ObjectUtils.isNotEmpty(pro_spec);
  }

  async getProductDetailsById(id: string): Promise<ProductDto> {
    if (StringUtils.isEmpty(id)) {
      throw new ProductException(ProductErrorConstant.PRODUCT_ID_IS_EMPTY);
    }

    const product = await this.productRepository.findOneById(id);
    if (ObjectUtils.isEmpty(product)) {
      throw new ProductException(ProductErrorConstant.PRODUCT_NOT_FOUND);
    }

    const { subcat_name, cat_name } = await this.categoryService.findNameById(product.subcat_id);
    const owner_username = await this.authenticationService
      .findUserById(product.owner_id)
      .then(user => user.username);

    const proSpec = await this.productSpecificationRepository.findAllByFilter({ pro_id: id });
    const proSpecDto = this.productMapper.mapSchemaListToDtoList(proSpec.map(spec => spec.toObject()), ProductSpecificationDto);

    const productObject = product.toObject();
    return {
      ...productObject,
      specification: proSpecDto,
      subcat_name,
      owner_username,
      cat_name
    };
  }


  async getProductListByFilter(req: Request, productListFilterDto: ProductListFilterDto): Promise<ProductDto[]> {
    productListFilterDto.owner_id = String(req.user);

    const productList = await this.productRepository.getProductByFilter(productListFilterDto);
    if (ObjectUtils.isEmpty(productList)) {
      return [];
    }

    const subcatIdToNameMap = await this.getCategoryAndSubcategoryMapByCatIds(productListFilterDto.cat_ids ?? []);

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


  async updateProductDetailsById(id: string, productDto: ProductDto): Promise<boolean> {
    const updateProduct = await this.productRepository.update(id, { ...productDto, _id: productDto.pro_id });
    const updateProductSpec = await this.productSpecificationRepository.updateProductSpecifications(id, productDto.specification);

    return ObjectUtils.isNotEmpty(updateProduct) && ObjectUtils.isNotEmpty(updateProductSpec);
  }

  async updateProductIsActive(id: string): Promise<boolean> {
    const product = await this.productRepository.findOneById(id);
    if (ObjectUtils.isEmpty(product)) {
      throw new ProductException(ProductErrorConstant.PRODUCT_NOT_FOUND);
    }

    const updateProduct = await this.productRepository.updateOneByFilter({ _id: id }, { is_active: !product.is_active });
    if (ObjectUtils.isEmpty(updateProduct)) {
      throw new ProductException(ProductErrorConstant.FAILED_TO_ACTIVATE);
    }

    return true;
  }

  async deleteProductById(id: string): Promise<boolean> {
    const specResult = await this.productSpecificationRepository.deleteProductSpecificationByProId(id);
    const productResult = await this.productRepository.delete(id);
    return ObjectUtils.isNotEmpty(productResult) && ObjectUtils.isNotEmpty(specResult);
  }

  // Product Verification
  async createProductVerification(req: Request, productDto: ProductDto): Promise<boolean> {
    if (ObjectUtils.isEmpty(productDto)) {
      throw new ProductException(ProductErrorConstant.PRODUCT_ID_IS_EMPTY);
    }

    const verificationId = productDto.verification_id ?? null;
    const pro_id = productDto.pro_id ?? uuidv4();
    const _id = uuidv4();

    const searchVerification = await this.productVerificationRepository.findOneById(verificationId);

    //If there is existed PENDING application
    if (ObjectUtils.isNotEmpty(searchVerification) && searchVerification.status === ProductConstant.PENDING) {
      return await this.updateProductVerificationDetailsById(req, verificationId, productDto);
    }

    //If resubmit Approved or Rejected application with no any changes
    if (ObjectUtils.isNotEmpty(searchVerification) && !productDto.specification) {
      const proDetails = await this.getProductVerificationDetailsById(productDto.verification_id);
      proDetails.status = ProductConstant.PENDING;
      proDetails.reviewed_by = null;
      proDetails.reviewed_on = null;
      productDto.rejected_reason = null;
      productDto.rating = 0;
      productDto.total_score = 0;
      const resubmitApplication = await this.productVerificationRepository.create({ ...proDetails, _id });
      const specifications = this.mapSpecificationsWithVerificationId(proDetails.specification, _id)
      const resubmitSpecification = await this.productVerificationSpecificationRepository.createList(specifications);
      return ObjectUtils.isNotEmpty(resubmitSpecification) || ObjectUtils.isNotEmpty(resubmitApplication);
    }

    //new application or resubmit with changes
    const owner_id = String(req.user);
    const productVerification = await this.productVerificationRepository.create({
      ...productDto,
      _id,
      pro_id,
      owner_id
    });

    const specifications = this.mapSpecificationsWithVerificationId(productDto.specification, _id);
    const proSpec = await this.productVerificationSpecificationRepository.createList(specifications);

    return ObjectUtils.isNotEmpty(productVerification) || ObjectUtils.isNotEmpty(proSpec);
  }

  private mapSpecificationsWithVerificationId(specification: any, verificationId: string) {
    return Object.values(specification).map((spec: any) => ({
      ...spec,
      verification_id: verificationId
    }));
  }

  async getProductVerificationDetailsById(id: string): Promise<ProductDto> {
    if (StringUtils.isEmpty(id)) {
      throw new ProductException(ProductErrorConstant.PRODUCT_ID_IS_EMPTY);
    }

    const productVerification = await this.productVerificationRepository.findOneById(id);
    if (ObjectUtils.isEmpty(productVerification)) {
      throw new ProductException(ProductErrorConstant.PRODUCT_NOT_FOUND);
    }

    const { subcat_name, cat_name } = await this.categoryService.findNameById(productVerification.subcat_id);
    const owner_username = await this.authenticationService
      .findUserById(productVerification.owner_id)
      .then(user => user.username);

    const subcategory = await this.categoryService.findOneSubcategoryById(productVerification.subcat_id);
    const rating_score = subcategory.rating_score ?? [];

    const specList = await this.subcategorySpecificationService.findActiveSubcategorySpecificationByCatId(productVerification.subcat_id);
    const specification = await this.populateSpecDetails(id, specList, productVerification.status);

    const productVerificationObject = productVerification.toObject()
    return {
      ...productVerificationObject,
      cat_name,
      subcat_name,
      owner_username,
      specification,
      rating_score
    };
  }

  private async populateSpecDetails(id: string, specList: SubcategorySpecificationDto[], status: string) {
    const proSpec = await this.productVerificationSpecificationRepository.findAllByFilter({ verification_id: id });
    const proSpecDto = this.productMapper.mapSchemaListToDtoList(proSpec.map(spec => spec.toObject()), ProductSpecificationDto);

    const finalSpecDetails = [];

    specList.forEach(spec => {
      const specId = spec._id;
      const matchingProSpec = proSpecDto.find((proSpec: any) => proSpec.spec_id === specId) || {};

      const mergedSpec: any = {
        spec_id: specId,
        spec_name: spec.subcat_spec_name || "",
        spec_desc: matchingProSpec.spec_desc || "",
        rating_score: spec.rating_score || [],
        spec_type: spec.cat_type || "",
        prefix: spec.prefix || "",
        suffix: spec.suffix || "",
        score: matchingProSpec.score ?? (spec.rating_score.length && status !== ProductConstant.REJECTED
          ? this.calculateRecommendScore(matchingProSpec.spec_desc || "", spec.rating_score)
          : null),
        subspecification: []
      };

      const finalSubspecifications = [];
      const subspecDetails = matchingProSpec.subspecification || [];

      spec.children?.forEach(child => {
        const subspecId = child._id;
        const matchingSubspec = subspecDetails.find((subspec: any) => subspec.subspec_id === subspecId) || {};

        const mergedSubspec = {
          subspec_id: subspecId,
          subspec_name: child.subcat_subspec_name || "",
          subspec_desc: matchingSubspec.subspec_desc || "",
          rating_score: child.rating_score || [],
          prefix: child.prefix || "",
          suffix: child.suffix || "",
          spec_id: specId,
          score: matchingSubspec.score ?? (child.rating_score.length && status !== ProductConstant.REJECTED
            ? this.calculateRecommendScore(matchingSubspec.subspec_desc || "", child.rating_score)
            : null),
        };

        finalSubspecifications.push(mergedSubspec);
      });

      mergedSpec.subspecification = finalSubspecifications;
      finalSpecDetails.push(mergedSpec);
    });

    return finalSpecDetails;
  }

  private calculateRecommendScore(value: string, ratingScore: any[]): number {
    let maxScore = 0;
    ratingScore.forEach(rating => {
      let score = 0;
      switch (rating.action) {
        case CategoryConstant.RATING_HAVE_VALUE:
          score = rating.score;
          break;
        case CategoryConstant.RATING_CONTAINS:
          score = value.includes(rating.value) ? rating.score : 0;
          break;
        case CategoryConstant.RATING_EQUAL_TO:
          score = parseInt(value) === parseInt(rating.value) ? rating.score : 0;
          break;
        case CategoryConstant.RATING_MORE_THAN:
          score = parseInt(value) >= parseInt(rating.value) ? rating.score : 0;
          break;
        case CategoryConstant.RATING_LESS_THAN:
          score = parseInt(value) <= parseInt(rating.value) ? rating.score : 0;
          break;
      }
      maxScore = Math.max(maxScore, score);
    });

    return maxScore;
  }

  async getProductVerificationListByFilter(req: Request,  productListFilterDto: ProductListFilterDto): Promise<ProductDto[]> {
    productListFilterDto.owner_id = String(req.user);
    const productList = await this.productVerificationRepository.getProductByFilter(productListFilterDto);
    if (ObjectUtils.isEmpty(productList)) {
      return [];
    }

    const [subcatIdToNameMap, usernameMap] = await Promise.all([
      this.getCategoryAndSubcategoryMapByCatIds(productListFilterDto.cat_ids ?? []),
      this.getUsernameMapByUserIds(
        productList.flatMap(product => product.reviewed_by ? [product.owner_id, product.reviewed_by] : [product.owner_id])
      )
    ]);

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

  private async getCategoryAndSubcategoryMapByCatIds(catIds: string[]) {
    const catNames = await this.categoryService.findAllSubcategoryNameByIds(catIds);
    return catNames.reduce((map, cat) => {
      if (cat.subcat_id) {
        map.set(cat.subcat_id, { subcat_name: cat.subcat_name, cat_name: cat.cat_name });
      }
      return map;
    }, new Map<string, { subcat_name: string, cat_name: string }>());
  }

  private async getUsernameMapByUserIds(userIds: string[]) {
    const userList = await this.authenticationService.findAllUsersByFilter({ user_id: { $in: userIds } });
    return userList.reduce((map, user) => {
      map.set(user.user_id, user.username);
      return map;
    }, new Map<string, string>());
  }

  async updateProductVerificationDetailsById(req: Request, id: string, productDto: ProductDto): Promise<boolean> {
    const username = String(req.user);

    const updateProductSpec = await this.productVerificationSpecificationRepository.updateProductSpecifications(id, productDto.specification);

    const updateProduct = {
      ...productDto,
      last_updated_on: new Date(),
      last_updated_by: username
    };

    const product = await this.productVerificationRepository.update(id, updateProduct);

    return ObjectUtils.isNotEmpty(product) && updateProductSpec;
  }

  async updateProductVerificationReviewById(req: Request, id: string, productDto: ProductDto): Promise<boolean> {
    const username = String(req.user);

    const updateProductData: any = {
      reviewed_on: new Date(),
      reviewed_by: username,
      status: productDto.status,
      rejected_reason: productDto.rejected_reason ?? null
    };

    let updateProductSpec = true;
    if ([ProductConstant.APPROVED, ProductConstant.PENDING].includes(productDto.status)) {
      if (productDto.status === ProductConstant.APPROVED) {
        Object.assign(updateProductData, {
          rating: productDto.rating,
          total_score: productDto.total_score
        });
        await this.createProduct(productDto);
      }
      updateProductSpec = await this.productVerificationSpecificationRepository.updateProductSpecificationsScore(id, productDto.specification);
    }

    const product = await this.productVerificationRepository.update(id, updateProductData);

    return ObjectUtils.isNotEmpty(product) && updateProductSpec;
  }

  async deleteProductVerificationDetailsById(id: string): Promise<boolean> {
    const specResult = await this.productVerificationSpecificationRepository.deleteProductSpecificationByVerificationId(id);
    const productResult = await this.productVerificationRepository.delete(id);
    return ObjectUtils.isNotEmpty(productResult) && ObjectUtils.isNotEmpty(specResult);
  }
}