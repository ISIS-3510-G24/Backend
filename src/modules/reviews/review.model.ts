export class Review {
    id: string;
    reviewer_id: string;
    product_id?: string;
    reviewed_user_id?: string;
    review_rating: number;
    review_message: string;
    review_image?: string;
}
