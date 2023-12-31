import axios, { Axios } from "axios";

/**
 * Represents an API client for interacting with the SalesBit API.
 */
export class APIClient {
  private axiosInstance: Axios;

  /**
   * Creates an instance of the APIClient class.
   * @param baseURL - The base URL of the SalesBit API.
   * @param token - The authentication token for accessing the API.
   */
  constructor(baseURL: string, private token: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * Retrieves the list of categories from the SalesBit API.
   * @returns A Promise that resolves to an array of CategoryNode objects.
   * @throws If an error occurs while making the API request.
   */
  public async getCategories(): Promise<CategoryNode[]> {
    try {
      const response = await this.axiosInstance.get<CategoryNode[]>(
        "/api/v1/categories"
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lists the categories based on the provided request parameters.
   * @param request - The request parameters for listing categories.
   * @returns A Promise that resolves to a CategoriesListResponse object.
   * @throws If an error occurs while making the API request.
   */
  public async listCategories(
    request: ListRequest
  ): Promise<CategoriesListResponse> {
    try {
      const response = await this.axiosInstance.post<CategoriesListResponse>(
        "/api/v1/categories/list",
        request
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves a specific category from the SalesBit API.
   * @param id - The ID of the category to retrieve.
   * @returns A Promise that resolves to a Category object.
   * @throws If an error occurs while making the API request.
   */
  public async getCategory(id: number): Promise<Category> {
    try {
      const response = await this.axiosInstance.get<Category>(
        "/api/v1/categories/" + id
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Lists the products based on the provided request parameters.
   * @param request - The request parameters for listing products.
   * @returns A Promise that resolves to a ProductsListResponse object.
   * @throws If an error occurs while making the API request.
   */
  public async listProducts(
    request: ListRequest
  ): Promise<ProductsListResponse> {
    try {
      const response = await this.axiosInstance.post<ProductsListResponse>(
        "/api/v1/products/list",
        request
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves a specific product from the SalesBit API.
   * @param id - The ID of the product to retrieve.
   * @returns A Promise that resolves to a Product object.
   * @throws If an error occurs while making the API request.
   */
  public async getProduct(id: number): Promise<Product> {
    try {
      const response = await this.axiosInstance.get<Product>(
        "/api/v1/products/" + id
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async postCheckout(request: Checkout): Promise<Preorder> {
    try {
      const response = await this.axiosInstance.post<Preorder>(
        "/api/v1/checkout",
        request
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async postOrder(request: NewOrder): Promise<Order> {
    try {
      const response = await this.axiosInstance.post<Order>(
        "/api/v1/orders",
        request
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
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

export interface Preorder extends Order {}

export interface Item {
  id?: number;
  uid: string;
  label?: string;
  amount: number;
}

export enum OrderStatus {
  new = 1,
  paying, //payment pending
  paid, // payment successful
  unpaid, // payment failed
}

export enum InvoiceStatus {
  new = 1,
  paid,
  unpaid, // payment failed
}

export interface Invoice {
  id?: number;
  created_at: Date;
  value: number;
  order: Order;
  updated_at?: Date;
}
