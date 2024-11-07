import { ProductSpecificationDto } from "./product-specification.dto";
import { SubcategoryRatingScoreDto } from "../../category/dtos/subcategory-rating-score.dto";
export declare class ProductDto {
    _id: string;
    verification_id: string;
    pro_id: string;
    product_name: string;
    model_no: string;
    cat_id: string;
    cat_name: string;
    subcat_id: string;
    subcat_name: string;
    owner_id: string;
    owner_username: string;
    product_img: object;
    status: string;
    last_updated_on: Date;
    reviewed_by: string;
    admin_username: string;
    reviewed_on: Date;
    is_active: boolean;
    rating: number;
    total_score: number;
    specification: Array<ProductSpecificationDto>;
    rating_score: Array<SubcategoryRatingScoreDto>;
    rejected_reason: string;
}
