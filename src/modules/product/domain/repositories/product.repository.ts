import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../../../../common/database/abstracts/repository.abstract";
import { Product } from "../schema/product.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductListFilterDto } from "../../dtos/product-list-filter.dto";
import { ConsumerProductFilterDto } from "../../dtos/consumer-product-filter.dto";
import { ProductDto } from "../../dtos/product.dto";

@Injectable()
export class ProductRepository extends AbstractRepository<Product> {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>
  ) {
    super(productModel);
  }

  async getProductByFilter(productListFilterDto: ProductListFilterDto): Promise<Product[]> {
    const { owner_id, status, cat_ids, search } = productListFilterDto;

    const filters: any = {};

    if (owner_id) {
      filters.owner_id = owner_id;
    }

    if (search) {
      filters.$or = [
        { product_name: { $regex: search, $options: "i" } },
        { model_no: { $regex: search, $options: "i" } }
      ];
    }

    if (status) {
      filters.status = { $in: status };
    }

    if (cat_ids && cat_ids.length > 0) {
      filters.subcat_id = { $in: cat_ids };
    }
    return this.productModel.find(filters).exec();
  }

  async getConsumerProductByFilter(filter: ConsumerProductFilterDto, skip: number, limit: number): Promise<{
    products: ProductDto[],
    total: number
  }> {
    const { subcat_id, search, specification, subspecification } = filter;

    const matchStage: any = { is_active: true, subcat_id };

    if (search) {
      matchStage.$or = [
        { product_name: { $regex: search, $options: "i" } },
        { model_no: { $regex: search, $options: "i" } }
      ];
    }

    const proSpecFilters: any[] = [];
    if (specification) {

      const ratingSpec = specification.find((spec) => spec.spec_id === "rating");
      if (ratingSpec) {
        const descArray = ratingSpec.desc_list.map(Number);
        matchStage.$and = [{ rating: { $in: descArray } }];
      }

      specification.forEach(spec => {
        if (spec.spec_id && spec.spec_id !== "rating") {
          const specFilter: any = { "specification.spec_id": spec.spec_id };
          if (spec.desc_list && spec.desc_list.length > 0) {
            specFilter["specification.spec_desc"] = { $in: spec.desc_list };
          } else {
            specFilter["specification.spec_desc"] = { $nin: ["", "-"] };
          }
          proSpecFilters.push(specFilter);
        }
      });
    }

    if (subspecification) {
      subspecification.forEach(subspec => {
        if (subspec.spec_id) {
          const subspecFilter: any = {
            "specification.spec_id": subspec.spec_id,
            "specification.subspecification.subspec_id": subspec.subspec_id
          };
          if (subspec.desc_list && subspec.desc_list.length > 0) {
            subspecFilter["specification.subspecification.subspec_desc"] = { $in: subspec.desc_list };
          }
          proSpecFilters.push(subspecFilter);
        }
      });
    }

    const pipeline: any[] = [
      { $match: matchStage },
      {
        $lookup: {
          from: "product_specification",
          localField: "_id",
          foreignField: "pro_id",
          as: "specification"
        }
      },
      { $unwind: "$specification" }
    ];

    if (proSpecFilters.length > 0) {
      pipeline.push({ $match: { $or: proSpecFilters } });
    }

    pipeline.push(
      {
        $group: {
          _id: "$_id",
          product: { $first: "$$ROOT" }
        }
      },
      { $replaceRoot: { newRoot: "$product" } },
      { $sort: { rating: -1, product_name: 1 } },
      { $project: { specification: 0 } }
    );

    const productsPipeline = [...pipeline, { $skip: Number(skip) }, { $limit: Number(limit) }];
    const products = await this.productModel.aggregate(productsPipeline).exec();

    const totalPipeline = [...pipeline, { $count: "total" }];
    const totalResult = await this.productModel.aggregate(totalPipeline).exec();
    const total = totalResult.length > 0 ? totalResult[0] : 0;

    return { products, total: total.total };
  }
}