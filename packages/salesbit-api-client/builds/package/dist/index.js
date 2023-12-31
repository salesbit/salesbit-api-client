"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceStatus = exports.OrderStatus = exports.APIClient = void 0;
const axios_1 = __importDefault(require("axios"));
/**
 * Represents an API client for interacting with the SalesBit API.
 */
class APIClient {
    /**
     * Creates an instance of the APIClient class.
     * @param baseURL - The base URL of the SalesBit API.
     * @param token - The authentication token for accessing the API.
     */
    constructor(baseURL, token) {
        this.token = token;
        this.axiosInstance = axios_1.default.create({
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
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axiosInstance.get("/api/v1/categories");
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Lists the categories based on the provided request parameters.
     * @param request - The request parameters for listing categories.
     * @returns A Promise that resolves to a CategoriesListResponse object.
     * @throws If an error occurs while making the API request.
     */
    listCategories(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axiosInstance.post("/api/v1/categories/list", request);
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Retrieves a specific category from the SalesBit API.
     * @param id - The ID of the category to retrieve.
     * @returns A Promise that resolves to a Category object.
     * @throws If an error occurs while making the API request.
     */
    getCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axiosInstance.get("/api/v1/categories/" + id);
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Lists the products based on the provided request parameters.
     * @param request - The request parameters for listing products.
     * @returns A Promise that resolves to a ProductsListResponse object.
     * @throws If an error occurs while making the API request.
     */
    listProducts(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axiosInstance.post("/api/v1/products/list", request);
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Retrieves a specific product from the SalesBit API.
     * @param id - The ID of the product to retrieve.
     * @returns A Promise that resolves to a Product object.
     * @throws If an error occurs while making the API request.
     */
    getProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axiosInstance.get("/api/v1/products/" + id);
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    postCheckout(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axiosInstance.post("/api/v1/checkout", request);
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    postOrder(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axiosInstance.post("/api/v1/orders", request);
                return response.data;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.APIClient = APIClient;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["new"] = 1] = "new";
    OrderStatus[OrderStatus["paying"] = 2] = "paying";
    OrderStatus[OrderStatus["paid"] = 3] = "paid";
    OrderStatus[OrderStatus["unpaid"] = 4] = "unpaid";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var InvoiceStatus;
(function (InvoiceStatus) {
    InvoiceStatus[InvoiceStatus["new"] = 1] = "new";
    InvoiceStatus[InvoiceStatus["paid"] = 2] = "paid";
    InvoiceStatus[InvoiceStatus["unpaid"] = 3] = "unpaid";
})(InvoiceStatus || (exports.InvoiceStatus = InvoiceStatus = {}));
