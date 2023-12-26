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
exports.APIClient = void 0;
const axios_1 = __importDefault(require("axios"));
class APIClient {
    constructor(baseURL, token) {
        this.token = token;
        this.axiosInstance = axios_1.default.create({
            baseURL,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
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
}
exports.APIClient = APIClient;
