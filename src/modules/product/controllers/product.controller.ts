import { Body, Controller, Delete, Get, Inject, Post, Put, Query } from "@nestjs/common";
import { ProductService } from "../services/implementations/product.service";
import { IProductService } from "../services/interfaces/product.service.interface";
import { ProductDto } from "../dtos/product.dto";
import { ProductListFilterDto } from "../dtos/product-list-filter.dto";

@Controller("product")
export class ProductController {
  constructor(@Inject(ProductService.name) private readonly productService: IProductService) {
  }

  @Post("create-product")
  async createProduct(@Body() productDto: ProductDto): Promise<boolean> {
    return await this.productService.createProduct(productDto);
  }

  @Get("get-product-by-id")
  async getProductById(@Query("id") id: string): Promise<ProductDto> {
    return await this.productService.getProductById(id);
  }

  @Post("get-product-by-filter")
  async getProductByFilter(@Body() productListFilterDto: ProductListFilterDto): Promise<ProductDto[]> {
    return await this.productService.getProductByFilter(productListFilterDto);
  }

  @Get("get-product-verification-details-by-id")
  async getProductVerificationDetailsById(@Query("id") id: string): Promise<ProductDto> {
    return await this.productService.getProductVerificationDetailsById(id);
  }

  @Post("get-product-verification-details-by-filter")
  async getProductVerificationDetailsByFilter(@Body() productListFilterDto: ProductListFilterDto): Promise<ProductDto[]> {
    return await this.productService.getProductVerificationDetailsByFilter(productListFilterDto);
  }

  @Put("update-product-by-id")
  async updateProductById(@Query("id") id: string,
                          @Body() productDto: ProductDto): Promise<boolean> {
    return await this.productService.updateProductById(id, productDto);
  }

  @Put("update-product-is-active")
  async updateProductIsActive(@Query("id") id: string): Promise<boolean> {
    return await this.productService.updateProductIsActive(id);
  }

  @Put("update-product-verification-details-by-id")
  async updateProductVerificationDetailsById(@Query("id") id: string, @Body() productDto: ProductDto): Promise<boolean> {
    return await this.productService.updateProductVerificationDetailsById(id, productDto);
  }

  @Delete("delete-product-by-id")
  async deleteProductById(@Query("id") id: string): Promise<boolean> {
    return await this.productService.deleteProductById(id);
  }
}