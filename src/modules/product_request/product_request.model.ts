export class ProductRequest {
    id: string;
    user_id: string;
    product_id?: string;
    req_name: string;
    req_description: string;
    req_image?: string;
    completed: boolean;
}