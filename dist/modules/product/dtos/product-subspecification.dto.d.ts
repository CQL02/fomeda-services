import { RatingScoreDto } from "../../category/dtos/rating-score.dto";
export declare class ProductSubspecificationDto {
    spec_id: string;
    subspec_id: string;
    subspec_name: string;
    subspec_desc: string;
    prefix: string;
    suffix: string;
    score: number;
    rating_score: Array<RatingScoreDto>;
}
