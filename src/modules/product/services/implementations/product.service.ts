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
import { ProductSpecificationDto } from "../../dtos/product-specification.dto";

@Injectable()
export class ProductService implements IProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productSpecificationRepository: ProductSpecificationRepository,
    private readonly productMapper: ProductMapper,
    @Inject(CategoryService.name) private readonly categoryService: ICategoryService,
    @Inject(SubcategorySpecificationService.name) private readonly subcategorySpecificationService: ISubcategorySpecificationService,
    private readonly authenticationService: AuthenticationService
  ) {
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
    const specList = await this.subcategorySpecificationService.findSubcategorySpecificationByCatId(product.subcat_id);
    const specMap = new Map<string, string>;
    const subspecMap = new Map<string, string>;

    specList.forEach(spec => {
      specMap.set(spec._id, spec.subcat_spec_name);
      spec.children?.forEach(child => {
        subspecMap.set(child._id, child.subcat_subspec_name);
      });
    });

    pro_spec_dto.map((spec: any) => {
      spec.spec_name = specMap.get(spec.spec_id) || "";
      spec.subspecification?.map((subspec: any) => subspec.subspec_name = subspecMap.get(subspec.subspec_id) || "");
    });

    return { ...product.toObject(), specification: pro_spec_dto, subcat_name: subcat_name, owner_username: username, cat_name: cat_name };
  }

  async getProductByFilter(productListFilterDto: ProductListFilterDto): Promise<ProductDto[]> {
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

  async updateProductById(id: string, productDto: ProductDto): Promise<boolean> {
    const product = await this.productRepository.findOneById(id);
    if (ObjectUtils.isEmpty(product)) {
      throw new ProductException(ProductErrorConstant.PRODUCT_NOT_FOUND);
    }

    const updateProduct = await this.productRepository.update(id, productDto);
    const updateProductSpec = await this.productSpecificationRepository.updateProductSpecifications(id, productDto.specification);

    return ObjectUtils.isNotEmpty(updateProduct) || ObjectUtils.isNotEmpty(updateProductSpec);
  }

  async updateProductIsActive(id: string): Promise<boolean> {
    const product = await this.productRepository.findOneById(id);
    if (ObjectUtils.isEmpty(product)) {
      throw new ProductException(ProductErrorConstant.PRODUCT_NOT_FOUND);
    }

    const updateProduct = await this.productRepository.updateOneByFilter({ _id: id }, { is_active: !product.is_active });
    return ObjectUtils.isEmpty(updateProduct);
  }

  async deleteProductById(id: string): Promise<boolean> {
    const productResult = await this.productRepository.delete(id);
    const specResult = await this.productSpecificationRepository.delete(id);
    return ObjectUtils.isNotEmpty(productResult) || ObjectUtils.isNotEmpty(specResult);
  }
}