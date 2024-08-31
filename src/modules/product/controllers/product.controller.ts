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

  @Put("update-product-by-id")
  async updateProductById(@Query("id") id: string,
                          @Body() productDto: ProductDto): Promise<boolean> {
    return await this.productService.updateProductById(id, productDto);
  }

  @Put("update-product-is-active")
  async updateProductIsActive(@Query("id") id: string): Promise<boolean> {
    return await this.productService.updateProductIsActive(id);
  }

  @Delete("delete-product-by-id")
  async deleteProductById(@Query("id") id: string): Promise<boolean> {
    return await this.productService.deleteProductById(id);
  }
}