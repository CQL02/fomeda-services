export declare class ConsumerProductFilterDto {
    subcat_id?: string;
    search?: string;
    specification?: SpecificationFilter[];
    subspecification?: SubspecificationFilter[];
}
declare class SpecificationFilter {
    spec_id?: string;
    spec_name?: string;
    spec_type: string;
    field_type: string;
    desc_list?: string[];
    prefix?: string;
    suffix?: string;
}
declare class SubspecificationFilter {
    spec_id?: string;
    subspec_id?: string;
    subspec_name?: string;
    desc_list?: string[];
    field_type: string;
    prefix?: string;
    suffix?: string;
}
export {};
