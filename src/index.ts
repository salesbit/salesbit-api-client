import axios, { Axios } from "axios";

export class APIClient {
  private axiosInstance: Axios;

  constructor(baseURL: string, private token: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

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
