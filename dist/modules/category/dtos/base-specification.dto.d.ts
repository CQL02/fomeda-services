import { BaseSubspecificationDto } from "./base-subspecification.dto";
import { RatingScoreDto } from "./rating-score.dto";
export declare class BaseSpecificationDto {
    _id: string;
    cat_id: string;
    cat_type: string;
    subcat_spec_name: string;
    created_by: string;
    created_name: string;
    created_on: Date;
    last_updated_by: string;
    last_updated_name: string;
    last_updated_on: Date;
    is_active: boolean;
    allow_input: boolean;
    children: Array<BaseSubspecificationDto>;
    is_origin: boolean;
    is_required: boolean;
    prefix: string;
    suffix: string;
    field_type: string;
    is_score_contributed: boolean;
    rating_score: Array<RatingScoreDto>;
}
