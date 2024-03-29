import axios, { Axios } from "axios";

/**
 * Represents an API client for interacting with the SalesBit API.
 */
export class APIClient {
  //
  private projectInstance: Axios;
  private userInstance: Axios;
  private baseURL: string;
  private uid: string;
  private cache: any;
  /**
   * Creates an instance of the APIClient class.
   * @param baseURL - The base URL of the SalesBit API.
   * @param token - The authentication token for accessing the API.
   */
  constructor(
    baseURL: string,
    uid: string,
    private token: string
  ) {
    this.projectInstance = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    this.userInstance = axios.create({
      baseURL,
      withCredentials: true,
    });
    this.baseURL = baseURL;
    this.uid = uid;
    this.cache = {};
  }

  private getCache = (key: string) => {
    const entry = localStorage.getItem(key);
    if (entry) {
      const cacheEntry = JSON.parse(entry);
      if (!cacheEntry.expiry || cacheEntry.expiry > Date.now()) {
        return cacheEntry.data;
      } else {
        localStorage.removeItem(key);
      }
    }
    return null;
  };

  private setCache = (key: string, value: any, ttl: number = 60000) => {
    const entry = {
      data: value,
      expiry: ttl ? Date.now() + ttl : null,
    };
    localStorage.setItem(key, JSON.stringify(entry));
  };

  private rmCache = (key: string) => {
    localStorage.removeItem(key);
  };

  /**
   * Retrieves the list of categories from the SalesBit API.
   * @returns A Promise that resolves to an array of CategoryNode objects.
   * @throws If an error occurs while making the API request.
   */
  public async getCategories(): Promise<CategoryNode[]> {
    try {
      const response = await this.projectInstance.get<CategoryNode[]>("/api/v1/categories");
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
  public async listCategories(request: ListRequest): Promise<CategoriesListResponse> {
    try {
      const response = await this.projectInstance.post<CategoriesListResponse>("/api/v1/categories/list", request);
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
      const response = await this.projectInstance.get<Category>("/api/v1/categories/" + id);
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
  public async listProducts(request: ListRequest): Promise<ProductsListResponse> {
    try {
      const response = await this.projectInstance.post<ProductsListResponse>("/api/v1/products/list", request);
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
      const response = await this.projectInstance.get<Product>("/api/v1/products/" + id);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getProjectInfo(): Promise<any> {
    try {
      const response = await this.projectInstance.get<any>("/api/v1/me"); // from project
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async postCheckout(request: Checkout): Promise<Preorder> {
    try {
      const response = await this.projectInstance.post<Preorder>("/api/v1/checkout", request);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async postOrder(request: NewOrder): Promise<Order> {
    try {
      const response = await this.projectInstance.post<Order>("/api/v1/orders", request);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async postUser(request: NewUser): Promise<User> {
    try {
      const response = await this.projectInstance.post<User>("/api/v1/users", request);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public createCheckout(app: HTMLElement, items: Item[], options: { layout?: { [key: string]: any } }, success: (order: Order) => {}): HTMLIFrameElement {
    const iframe = document.createElement("iframe");
    iframe.src = this.baseURL + "/projects/" + this.uid + "/checkout";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.style.position = "absolute";
    iframe.style.opacity = "0";
    iframe.frameBorder = "0";

    app.replaceChildren(iframe);

    window.addEventListener("message", (event) => {
      if (event.source === window) {
        // reject messages from self
        return;
      }

      if (typeof event.data === "object") {
        if (event.data.sender === "checkout") {
          switch (event.data.action) {
            case "mounted":
              {
                if (iframe.contentWindow) {
                  iframe.contentWindow.postMessage({ action: "calculate", data: { items } }, "*");
                  if (options.layout) {
                    iframe.contentWindow.postMessage(
                      {
                        action: "layout",
                        layout: options.layout,
                      },
                      "*"
                    );
                  }
                  iframe.style.opacity = "1";
                  iframe.style.position = "relative";
                  iframe.style.height = event.data.height + "px";
                }
              }
              break;
            case "resize":
              //console.log("resize", event.data.height);
              iframe.style.height = event.data.height + "px";
              break;
            case "pong":
              console.log("pong");
              break;
            case "maximize":
              iframe.style.position = "fixed";
              iframe.style.top = "0";
              iframe.style.left = "0";
              iframe.style.bottom = "0";
              iframe.style.right = "0";
              iframe.style.width = "100%";
              iframe.style.zIndex = "999999";
              setTimeout(() => {
                iframe.style.height = "100%";
              }, 100);
              break;
            case "unmaximize":
              iframe.style.position = "relative";
              iframe.style.zIndex = "initial";
              break;
            case "success":
              if (typeof success === "function") {
                success(event.data.order);
              }
            default:
              console.log(event.data);
              break;
          }
        } else if (event.data.sender === "me") {
          if (["loggedIn", "loggedOut"].indexOf(event.data.action) >= 0) {
            if (iframe.contentWindow) {
              iframe.contentWindow.postMessage({ action: "reload", data: { items } }, "*");
            }
          }
        }
      }
    });
    return iframe;
  }

  public createMe(app: HTMLElement, options: { layout?: { [key: string]: any } }, callbacks: { error: (err: any) => {}; success: (me: any) => {} }): HTMLIFrameElement {
    const iframe = document.createElement("iframe");
    iframe.src = this.baseURL + "/projects/" + this.uid + "/me";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.style.position = "absolute";
    iframe.style.opacity = "0";
    iframe.frameBorder = "0";

    app.replaceChildren(iframe);

    window.addEventListener("message", (event) => {
      if (event.source === window) {
        // reject messages from self
        return;
      }
      if (typeof event.data === "object") {
        if (event.data.sender === "me") {
          switch (event.data.action) {
            case "mounted":
              {
                if (iframe.contentWindow) {
                  if (options.layout) {
                    iframe.contentWindow.postMessage(
                      {
                        action: "layout",
                        layout: options.layout,
                      },
                      "*"
                    );
                  }
                  iframe.style.opacity = "1";
                  iframe.style.position = "relative";
                  iframe.style.height = event.data.height + "px";
                }
              }
              break;
            case "resize":
              iframe.style.height = event.data.height + "px";

              break;
            case "success":
              if (typeof callbacks.success === "function") {
                callbacks.success(event.data.me);
              }
            case "error":
              if (typeof callbacks.error === "function") {
                callbacks.error(event.data.err);
              }
            default:
              console.log(event.data);
              break;
          }
        }
      }
    });
    return iframe;
  }

  private async getUser(url: string, ttl: number = 60000): Promise<any> {
    try {
      let data = this.getCache(url);
      if (data) {
        return data;
      }
      const response = await this.userInstance.get<any>(url); // from user
      data = response.data;
      this.setCache(url, data, ttl);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getUserInfo(ttl: number = 60000): Promise<any> {
    try {
      return await this.getUser("/api/v1/me", ttl);
    } catch (error) {
      throw error;
    }
  }

  private async getCsrf(): Promise<string> {
    try {
      const response = await this.userInstance.get<any>("/auth/csrf");
      const data = response.data;
      if (!data.csrfToken) {
        throw new Error("csrfToken not found");
      }
      return data.csrfToken;
    } catch (error) {
      throw error;
    }
  }

  public async postLogin(email: string, password: string): Promise<any> {
    try {
      const csrf = await this.getCsrf();
      if (!csrf) {
        throw new Error("csrfToken not found");
      }

      // Create a URLSearchParams object with your data
      const params = new URLSearchParams();
      params.append("username", email);
      params.append("password", password);
      params.append("redirect", "false");
      params.append("csrfToken", csrf);
      params.append("callbackUrl", "");

      // Make the POST request with `application/x-www-form-urlencoded` content type
      const response = await this.userInstance.post("/auth/callback/credentials?", params.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      return this.getUserInfo();
    } catch (error) {
      throw error;
    }
  }

  public async postLogout(): Promise<any> {
    try {
      const csrf = await this.getCsrf();
      if (!csrf) {
        throw new Error("csrfToken not found");
      }

      // Create a URLSearchParams object with your data
      const params = new URLSearchParams();
      params.append("csrfToken", csrf);
      params.append("callbackUrl", "");

      // Make the POST request with `application/x-www-form-urlencoded` content type
      const response = await this.userInstance.post("/auth/signout", params.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      this.rmCache("/api/v1/me");

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

export const humanizeMoney = (number: number, currencyChar = "$") => {
  // Determine if the number has a fractional part
  const hasFractionalPart = number % 1 !== 0;

  // Create an options object for the Intl.NumberFormat
  const options = {
    style: "decimal",
    minimumFractionDigits: hasFractionalPart ? 2 : 0, // Ensure two decimal places if there is a fractional part
    maximumFractionDigits: 2,
  };

  // Create a new Intl.NumberFormat object with the desired options
  const formatter = new Intl.NumberFormat("en-US", options);

  // Format the number using the formatter
  const formattedNumber = formatter.format(number);

  // Return the formatted string with the currency character
  return `${currencyChar}${formattedNumber}`;
};
