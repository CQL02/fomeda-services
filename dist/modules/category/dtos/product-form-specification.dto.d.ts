import { ProductFormSubspecificationDto } from "./product-form-subspecification.dto";
export declare class ProductFormSpecificationDto {
    _id: string;
    subcat_spec_name: string;
    cat_type: string;
    is_required: boolean;
    allow_input: boolean;
    prefix: string;
    suffix: string;
    field_type: string;
    subspecification: Array<ProductFormSubspecificationDto>;
}
