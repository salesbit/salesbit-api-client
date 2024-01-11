/**
 * Represents an API client for interacting with the SalesBit API.
 */
export declare class APIClient {
    private token;
    private projectInstance;
    private userInstance;
    private baseURL;
    private uid;
    /**
     * Creates an instance of the APIClient class.
     * @param baseURL - The base URL of the SalesBit API.
     * @param token - The authentication token for accessing the API.
     */
    constructor(baseURL: string, uid: string, token: string);
    /**
     * Retrieves the list of categories from the SalesBit API.
     * @returns A Promise that resolves to an array of CategoryNode objects.
     * @throws If an error occurs while making the API request.
     */
    getCategories(): Promise<CategoryNode[]>;
    /**
     * Lists the categories based on the provided request parameters.
     * @param request - The request parameters for listing categories.
     * @returns A Promise that resolves to a CategoriesListResponse object.
     * @throws If an error occurs while making the API request.
     */
    listCategories(request: ListRequest): Promise<CategoriesListResponse>;
    /**
     * Retrieves a specific category from the SalesBit API.
     * @param id - The ID of the category to retrieve.
     * @returns A Promise that resolves to a Category object.
     * @throws If an error occurs while making the API request.
     */
    getCategory(id: number): Promise<Category>;
    /**
     * Lists the products based on the provided request parameters.
     * @param request - The request parameters for listing products.
     * @returns A Promise that resolves to a ProductsListResponse object.
     * @throws If an error occurs while making the API request.
     */
    listProducts(request: ListRequest): Promise<ProductsListResponse>;
    /**
     * Retrieves a specific product from the SalesBit API.
     * @param id - The ID of the product to retrieve.
     * @returns A Promise that resolves to a Product object.
     * @throws If an error occurs while making the API request.
     */
    getProduct(id: number): Promise<Product>;
    getProjectInfo(): Promise<any>;
    postCheckout(request: Checkout): Promise<Preorder>;
    postOrder(request: NewOrder): Promise<Order>;
    postUser(request: NewUser): Promise<User>;
    createCheckout(app: HTMLElement, items: Item[], options: {
        layout?: {
            [key: string]: any;
        };
    }, success: (order: Order) => {}): HTMLIFrameElement;
    createMe(app: HTMLElement, options: {
        layout?: {
            [key: string]: any;
        };
    }, callbacks: {
        error: (err: any) => {};
        success: (me: any) => {};
    }): HTMLIFrameElement;
    getUserInfo(): Promise<any>;
    private getCsrf;
    postLogin(email: string, password: string): Promise<any>;
    postLogout(): Promise<any>;
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
/**
 * Represents a product in the salesbit API.
 */
export interface Product {
    id: number;
    enabled: boolean;
    created_at: Date;
    name: string;
    label: string;
    description?: string;
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
export interface Checkout {
    name: string;
    email: string;
    phone: string;
    billingProfile?: Profile;
    items: Item[];
    shippingProfile?: Profile;
    paymentMethod?: {
        id: string;
        [key: string]: any;
    };
    projectUid: string;
    register: boolean;
    submit: boolean;
}
export interface Profile {
    id?: number;
    name: string;
    lastname?: string;
    company?: string;
    phone: string;
    email: string;
    address: string;
    zip: string;
    city: string;
    region?: string;
    country: string;
    is_company?: boolean;
    extra?: any;
}
export interface Order {
    id?: number;
    uid?: string;
    created_at?: Date;
    items: Item[];
    shippingProfile?: Profile;
    status?: OrderStatus;
    amount?: number;
    weight?: number;
    volume?: number;
    sum?: number;
    shipping?: number;
    tax?: number;
    total?: number;
    updated_at?: Date;
}
export interface NewOrder extends Checkout {
    register: boolean;
    submit: boolean;
}
export interface Preorder extends Order {
}
export interface Item {
    id?: number;
    uid: string;
    label?: string;
    amount: number;
}
export declare enum OrderStatus {
    new = 1,
    paying = 2,//payment pending
    paid = 3,// payment successful
    unpaid = 4
}
export declare enum InvoiceStatus {
    new = 1,
    paid = 2,
    unpaid = 3
}
export interface Invoice {
    id?: number;
    created_at: Date;
    value: number;
    order: Order;
    updated_at?: Date;
}
export interface NewUser {
    name: string;
    email: string;
}
export interface User {
    id?: number;
    created_at?: Date;
    enabled?: boolean;
    email: string;
    name: string;
    lastname?: string;
    password?: string;
    password2?: string;
    billingProfiles?: Profile[];
    shippingProfiles?: Profile[];
    role?: number;
    media?: Media;
    media_id?: number;
    updated_at?: Date;
}
export interface Option {
    id?: number;
    created_at: Date;
    product_id: number;
    project_id?: number;
    updated_at?: Date;
}
export interface Value {
    id?: number;
    created_at?: Date;
    enabled?: boolean;
    name: string;
    label: string;
    description?: string;
    type: string;
    value: string;
    option_id: number;
    updated_at?: Date;
}
export interface Property {
    id?: number;
    created_at: Date;
    name: string;
    label: string;
    description?: string;
    option?: Option;
    option_id: number;
    product_id: number;
    project_id?: number;
    updated_at?: Date;
}
export interface Rate {
    id?: number;
    created_at?: Date;
    prices: Price[];
    value?: number;
    property_id: number;
    product_id: number;
    project_id?: number;
    updated_at?: Date;
}
export interface Price {
    id?: number;
    created_at?: Date;
    rates: Rate[];
    price?: number;
    product_id: number;
    project_id?: number;
    updated_at?: Date;
}
export declare const humanizeMoney: (number: number, currencyChar?: string) => string;
