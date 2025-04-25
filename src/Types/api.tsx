export interface Lead {
    id: number;
    name: string;
    email: string;
    personal_phone: string;
    description?:string;
    address?:string;
    business_phone?:string;
    home_phone?:string;
    nationality?:string;
    country_of_residence?:string;
    dob?:string;
    gender?:string;
    created_at: string;
}

export type ResponsePagination = {
    page: number;
    page_size: number;
    total: number;
};
  