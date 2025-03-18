import { ProductAvailability } from "../../common/enums";

export class Product {
    product_id: string;
    prod_quantity: number;
    prod_name: string;
    prod_image: string;
    prod_price: number;
    prod_description: string;
    prod_characteristics: string[];
    prod_availability: ProductAvailability;
    reviews: string[];
}
  