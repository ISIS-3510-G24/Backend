export class ShoppingBag {
    id: string;
    total_price: number;
    user_id: string;
    products: { product_id: string, quantity: number }[];
    order_id?: string;
}