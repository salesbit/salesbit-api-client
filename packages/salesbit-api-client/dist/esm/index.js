import axios from "axios";
/**
 * Represents an API client for interacting with the SalesBit API.
 */
export class APIClient {
    /**
     * Creates an instance of the APIClient class.
     * @param baseURL - The base URL of the SalesBit API.
     * @param token - The authentication token for accessing the API.
     */
    constructor(baseURL, uid, token) {
        this.token = token;
        this.getCache = (key) => {
            const entry = localStorage.getItem(key);
            if (entry) {
                const cacheEntry = JSON.parse(entry);
                if (!cacheEntry.expiry || cacheEntry.expiry > Date.now()) {
                    return cacheEntry.data;
                }
                else {
                    localStorage.removeItem(key);
                }
            }
            return null;
        };
        this.setCache = (key, value, ttl = 60000) => {
            const entry = {
                data: value,
                expiry: ttl ? Date.now() + ttl : null,
            };
            localStorage.setItem(key, JSON.stringify(entry));
        };
        this.rmCache = (key) => {
            localStorage.removeItem(key);
        };
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
    /**
     * Retrieves the list of categories from the SalesBit API.
     * @returns A Promise that resolves to an array of CategoryNode objects.
     * @throws If an error occurs while making the API request.
     */
    async getCategories() {
        try {
            const response = await this.projectInstance.get("/api/v1/categories");
            return response.data;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Lists the categories based on the provided request parameters.
     * @param request - The request parameters for listing categories.
     * @returns A Promise that resolves to a CategoriesListResponse object.
     * @throws If an error occurs while making the API request.
     */
    async listCategories(request) {
        try {
            const response = await this.projectInstance.post("/api/v1/categories/list", request);
            return response.data;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Retrieves a specific category from the SalesBit API.
     * @param id - The ID of the category to retrieve.
     * @returns A Promise that resolves to a Category object.
     * @throws If an error occurs while making the API request.
     */
    async getCategory(id) {
        try {
            const response = await this.projectInstance.get("/api/v1/categories/" + id);
            return response.data;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Lists the products based on the provided request parameters.
     * @param request - The request parameters for listing products.
     * @returns A Promise that resolves to a ProductsListResponse object.
     * @throws If an error occurs while making the API request.
     */
    async listProducts(request) {
        try {
            const response = await this.projectInstance.post("/api/v1/products/list", request);
            return response.data;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Retrieves a specific product from the SalesBit API.
     * @param id - The ID of the product to retrieve.
     * @returns A Promise that resolves to a Product object.
     * @throws If an error occurs while making the API request.
     */
    async getProduct(id) {
        try {
            const response = await this.projectInstance.get("/api/v1/products/" + id);
            return response.data;
        }
        catch (error) {
            throw error;
        }
    }
    async getProjectInfo() {
        try {
            const response = await this.projectInstance.get("/api/v1/me"); // from project
            return response.data;
        }
        catch (error) {
            throw error;
        }
    }
    async postCheckout(request) {
        try {
            const response = await this.projectInstance.post("/api/v1/checkout", request);
            return response.data;
        }
        catch (error) {
            throw error;
        }
    }
    async postOrder(request) {
        try {
            const response = await this.projectInstance.post("/api/v1/orders", request);
            return response.data;
        }
        catch (error) {
            throw error;
        }
    }
    async postUser(request) {
        try {
            const response = await this.projectInstance.post("/api/v1/users", request);
            return response.data;
        }
        catch (error) {
            throw error;
        }
    }
    createCheckout(app, items, options, success) {
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
                                        iframe.contentWindow.postMessage({
                                            action: "layout",
                                            layout: options.layout,
                                        }, "*");
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
                }
                else if (event.data.sender === "me") {
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
    createMe(app, options, callbacks) {
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
                                        iframe.contentWindow.postMessage({
                                            action: "layout",
                                            layout: options.layout,
                                        }, "*");
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
    async getUser(url, ttl = 60000) {
        try {
            let data = this.getCache(url);
            if (data) {
                return data;
            }
            const response = await this.userInstance.get(url); // from user
            data = response.data;
            this.setCache(url, data, ttl);
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    async getUserInfo(ttl = 60000) {
        try {
            return await this.getUser("/api/v1/me", ttl);
        }
        catch (error) {
            throw error;
        }
    }
    async getCsrf() {
        try {
            const response = await this.userInstance.get("/auth/csrf");
            const data = response.data;
            if (!data.csrfToken) {
                throw new Error("csrfToken not found");
            }
            return data.csrfToken;
        }
        catch (error) {
            throw error;
        }
    }
    async postLogin(email, password) {
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
        }
        catch (error) {
            throw error;
        }
    }
    async postLogout() {
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
        }
        catch (error) {
            throw error;
        }
    }
}
export var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["new"] = 1] = "new";
    OrderStatus[OrderStatus["paying"] = 2] = "paying";
    OrderStatus[OrderStatus["paid"] = 3] = "paid";
    OrderStatus[OrderStatus["unpaid"] = 4] = "unpaid";
})(OrderStatus || (OrderStatus = {}));
export var InvoiceStatus;
(function (InvoiceStatus) {
    InvoiceStatus[InvoiceStatus["new"] = 1] = "new";
    InvoiceStatus[InvoiceStatus["paid"] = 2] = "paid";
    InvoiceStatus[InvoiceStatus["unpaid"] = 3] = "unpaid";
})(InvoiceStatus || (InvoiceStatus = {}));
export const humanizeMoney = (number, currencyChar = "$") => {
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
