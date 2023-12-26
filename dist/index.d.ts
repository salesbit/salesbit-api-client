export declare class APIClient {
    private token;
    private axiosInstance;
    constructor(baseURL: string, token: string);
    listProducts(request: ListRequest): Promise<ProductsListResponse>;
    getProduct(id: number): Promise<Product>;
}
export interface ListRequest {
    Search?: string;
    Filter?: {
        [key: string]: string;
    };
    Start?: number;
    Length?: number;
    Sort?: {
        [key: string]: string;
    };
}
export interface ProductsListResponse {
    Data: Product[];
    Filtered: number;
    Total: number;
}
export interface Product {
    id: number;
    enabled: boolean;
    created_at: Date;
    name: string;
    label: string;
    description?: string;
    body?: string;
    note?: string;
    sku?: string;
    width: number;
    height: number;
    depth: number;
    weight: number;
    volume: number;
    media?: Media;
    media_id?: number;
    medias: Media[];
    price: number;
    on_sale?: boolean;
    sale_price?: number;
    updated_at: Date;
}
export interface Media {
    id?: number;
    created_at: Date;
    name: string;
    path: string;
    label?: string;
    description?: string;
    content_type: string;
    extension?: string;
    size: number;
    last_modified: Date;
    public_url?: string;
    project_id?: number;
    updated_at?: Date;
}
