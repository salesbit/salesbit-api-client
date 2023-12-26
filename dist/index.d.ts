export declare class APIClient {
    private token;
    private axiosInstance;
    constructor(baseURL: string, token: string);
    getCategories(): Promise<CategoryNode[]>;
    listCategories(request: ListRequest): Promise<CategoriesListResponse>;
    getCategory(id: number): Promise<Category>;
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
export interface ListResponse {
    Data: any[];
    Page: number;
    Filtered: number;
    Total: number;
}
export interface CategoriesListResponse extends ListResponse {
    Data: Category[];
}
export interface ProductsListResponse extends ListResponse {
    Data: Product[];
}
export interface Category {
    id: number;
    enabled: boolean;
    created_at: Date;
    name: string;
    label: string;
    description?: string;
    media?: Media;
    media_id?: number;
    parent_id?: number;
    updated_at: Date;
}
export interface CategoryNode extends Category {
    children?: CategoryNode[];
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
