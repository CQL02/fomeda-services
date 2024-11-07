import { SubcategoryDto } from "./subcategory.dto";
export declare class CategoryDto {
    _id: string;
    cat_name: string;
    created_by: string;
    created_name: string;
    created_on: Date;
    last_updated_by: string;
    last_updated_name: string;
    last_updated_on: Date;
    is_active: boolean;
    children: Array<SubcategoryDto>;
}
