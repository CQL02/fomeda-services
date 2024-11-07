import { SubcategoryRatingScoreDto } from "./subcategory-rating-score.dto";
export declare class SubcategoryDto {
    _id: string;
    cat_id: string;
    subcat_name: string;
    created_by: string;
    created_name: string;
    created_on: Date;
    last_updated_by: string;
    last_updated_name: string;
    last_updated_on: Date;
    is_active: boolean;
    rating_score: SubcategoryRatingScoreDto[];
}
