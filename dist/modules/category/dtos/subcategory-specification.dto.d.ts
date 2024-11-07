import { SubcategorySubspecificationDto } from "./subcategory-subspecification.dto";
import { RatingScoreDto } from "./rating-score.dto";
export declare class SubcategorySpecificationDto {
    _id: string;
    subcat_id: string;
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
    children: Array<SubcategorySubspecificationDto>;
    is_origin: boolean;
    is_required: boolean;
    prefix: string;
    suffix: string;
    field_type: string;
    is_score_contributed: boolean;
    rating_score: Array<RatingScoreDto>;
}
