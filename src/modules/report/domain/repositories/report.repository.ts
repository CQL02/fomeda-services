import { Injectable } from "@nestjs/common";
import { AbstractRepository } from "../../../../common/database/abstracts/repository.abstract";
import { Report } from "../schema/report.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ReportFilterDto } from "../../dtos/report-filter.dto";
import { ReportDto } from "../../dtos/report.dto";

@Injectable()
export class ReportRepository extends AbstractRepository<Report> {
  constructor(
    @InjectModel(Report.name)
    private readonly reportModel: Model<Report>
  ) {
    super(reportModel);
  }

  private buildAggregationPipeline(userId?: string, filterDto?: ReportFilterDto): any[] {
    const { search, subcat_ids, adm_status_list } = filterDto || {};

    const matchStage: any = { adm_status: { $in: adm_status_list } };

    const pipeline: any[] = [
      { $match: matchStage },
      {
        $lookup: {
          from: "product",
          let: { productId: "$pro_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$_id", "$$productId"] },
                    ...(userId ? [{ $eq: ["$owner_id", userId] }] : [])
                  ]
                }
              }
            },
            { $project: { product_name: 1, model_no: 1, subcat_id: 1, owner_id: 1 } }
          ],
          as: "product_data"
        }
      },
      { $unwind: { path: "$product_data", preserveNullAndEmptyArrays: false } }
    ];

    if (subcat_ids && subcat_ids.length > 0) {
      pipeline.push({
        $match: {
          "product_data.subcat_id": { $in: subcat_ids }
        }
      });
    }

    pipeline.push(
      {
        $lookup: {
          from: "subcategory",
          let: { subcatId: "$product_data.subcat_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$subcatId"] } } },
            { $project: { subcat_name: 1, cat_id: 1 } }
          ],
          as: "subcategory_data"
        }
      },
      { $unwind: { path: "$subcategory_data", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "category",
          let: { catId: "$subcategory_data.cat_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$catId"] } } },
            { $project: { cat_name: 1 } }
          ],
          as: "category_data"
        }
      },
      { $unwind: { path: "$category_data", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "user",
          let: { reviewerId: "$reviewed_by" },
          pipeline: [
            { $match: { $expr: { $eq: ["$user_id", "$$reviewerId"] } } },
            { $project: { username: 1 } }
          ],
          as: "user_data"
        }
      },
      { $unwind: { path: "$user_data", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          created_on: 1,
          sup_status: 1,
          adm_status: 1,
          reviewed_on: 1,
          pro_id: 1,
          reviewed_by: "$user_data.username",
          product_name: "$product_data.product_name",
          model_no: "$product_data.model_no",
          subcat_name: "$subcategory_data.subcat_name",
          cat_name: "$category_data.cat_name"
        }
      }
    );

    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { product_name: { $regex: search, $options: "i" } },
            { model_no: { $regex: search, $options: "i" } }
          ]
        }
      });
    }

    return pipeline;
  }

  async filterSupplierReportListByUserId(userId: string, filterDto: ReportFilterDto): Promise<ReportDto[]> {
    const pipeline = this.buildAggregationPipeline(userId, filterDto);
    return await this.reportModel.aggregate(pipeline).exec();
  }

  async filterAdminReportListByFilter(filterDto: ReportFilterDto): Promise<ReportDto[]> {
    const pipeline = this.buildAggregationPipeline(undefined, filterDto);
    return await this.reportModel.aggregate(pipeline).exec();
  }
}