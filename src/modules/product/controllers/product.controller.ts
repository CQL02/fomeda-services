import { Body, Controller, Delete, Get, Inject, Post, Put, Query } from "@nestjs/common";
import { ProductService } from "../services/implementations/product.service";
import { IProductService } from "../services/interfaces/product.service.interface";
import { ProductDto } from "../dtos/product.dto";
import { ProductListFilterDto } from "../dtos/product-list-filter.dto";
import { ConsumerService } from "../services/implementations/consumer.service";
import { ConsumerProductFilterDto } from "../dtos/consumer-product-filter.dto";

@Controller("product")
export class ProductController {
  constructor(
    @Inject(ProductService.name) private readonly productService: IProductService,
    @Inject(ConsumerService.name) private readonly consumerService: ConsumerService
  ) {
  }

  //Product
  @Post("create-product")
  async createProduct(@Body() productDto: ProductDto): Promise<boolean> {
    return await this.productService.createProduct(productDto);
  }

  @Get("get-product-details-by-id")
  async getProductById(@Query("id") id: string): Promise<ProductDto> {
    return await this.productService.getProductDetailsById(id);
  }

  @Post("get-product-list-by-filter")
  async getProductByFilter(@Body() productListFilterDto: ProductListFilterDto): Promise<ProductDto[]> {
    return await this.productService.getProductListByFilter(productListFilterDto);
  }

  @Put("update-product-details-by-id")
  async updateProductById(@Query("id") id: string,
                          @Body() productDto: ProductDto): Promise<boolean> {
    return await this.productService.updateProductDetailsById(id, productDto);
  }

  @Put("update-product-is-active")
  async updateProductIsActive(@Query("id") id: string): Promise<boolean> {
    return await this.productService.updateProductIsActive(id);
  }

  @Delete("delete-product-by-id")
  async deleteProductById(@Query("id") id: string): Promise<boolean> {
    return await this.productService.deleteProductById(id);
  }

  //Product Verification
  @Post("create-product-verification")
  async createProductVerification(@Body() productDto: ProductDto): Promise<boolean> {
    return await this.productService.createProductVerification(productDto);
  }

  @Get("get-product-verification-details-by-id")
  async getProductVerificationDetailsById(@Query("id") id: string): Promise<ProductDto> {
    return await this.productService.getProductVerificationDetailsById(id);
  }

  @Post("get-product-verification-list-by-filter")
  async getProductVerificationDetailsByFilter(@Body() productListFilterDto: ProductListFilterDto): Promise<ProductDto[]> {
    return await this.productService.getProductVerificationListByFilter(productListFilterDto);
  }

  @Put("update-product-verification-details-by-id")
  async updateProductVerificationDetailsById(@Query("id") id: string, @Body() productDto: ProductDto): Promise<boolean> {
    return await this.productService.updateProductVerificationDetailsById(id, productDto);
  }

  @Put("update-product-verification-review-by-id")
  async updateProductVerificationReviewById(@Query("id") id: string, @Body() productDto: ProductDto): Promise<boolean> {
    return await this.productService.updateProductVerificationReviewById(id, productDto);
  }

  @Delete("delete-product-verification-details-by-id")
  async deleteProductVerificationDetailsById(@Query("id") id: string): Promise<boolean> {
    return await this.productService.deleteProductVerificationDetailsById(id);
  }

  //Consumer
  @Post("get-consumer-product-by-filter")
  async getConsumerProductByFilter(@Query("skip") skip: number,
                                   @Query("limit") limit: number,
                                   @Body() filter: ConsumerProductFilterDto): Promise<{products: ProductDto[], total: number}> {
    return await this.consumerService.getConsumerProductByFilter(filter, skip, limit);
  }

  @Get("get-consumer-specification-filter-by-subcat_id")
  async getConsumerSpecificationFilterBySubcatId(@Query("id") subcat_id: string): Promise<ConsumerProductFilterDto> {
    return await this.consumerService.getConsumerSpecificationFilterBySubcatId(subcat_id);
  }

  @Get("get-consumer-compared-product")
  async getConsumerComparedProduct(@Query("subcat_id") subcat_id: string,
                                   @Query("ids") ids: string[]) {
    return await this.consumerService.getConsumerComparedProduct(subcat_id, ids);
  }

  @Get("get-product-details")
  async getProductDetails(@Query("id") id: string) {
    return await this.consumerService.getProductDetails(id);
  }
}