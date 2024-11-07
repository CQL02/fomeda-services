/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { AbstractRepository } from "../../../../common/database/abstracts/repository.abstract";
import { Product } from "../schema/product.schema";
import { Model } from "mongoose";
import { ProductListFilterDto } from "../../dtos/product-list-filter.dto";
import { ConsumerProductFilterDto } from "../../dtos/consumer-product-filter.dto";
import { ProductDto } from "../../dtos/product.dto";
export declare class ProductRepository extends AbstractRepository<Product> {
    private readonly productModel;
    constructor(productModel: Model<Product>);
    getProductByFilter(productListFilterDto: ProductListFilterDto): Promise<Product[]>;
    getConsumerProductByFilter(filter: ConsumerProductFilterDto, skip: number, limit: number): Promise<{
        products: ProductDto[];
        total: number;
    }>;
}
