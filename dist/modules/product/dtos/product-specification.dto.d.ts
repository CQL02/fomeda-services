import { ProductSubspecificationDto } from "./product-subspecification.dto";
import { RatingScoreDto } from "../../category/dtos/rating-score.dto";
export declare class ProductSpecificationDto {
    pro_id: string;
    verification_id: string;
    spec_id: string;
    spec_name: string;
    spec_desc: string;
    spec_type: string;
    prefix: string;
    suffix: string;
    score: number;
    rating_score: Array<RatingScoreDto>;
    subspecification: Array<ProductSubspecificationDto>;
}
