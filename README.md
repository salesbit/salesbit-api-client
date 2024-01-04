# Build

```bash
npm install

npm run build

npm pack --pack-destination builds/
```

# Quick start

### Install

```bash
npm install salesbit-api-client
```

### Import

```javascript
import { APIClient } from "salesbit-api-client";
```

### Create instance

```javascript
const client = new APIClient(url, token);
```

where **url**: string like this 'https://api.site.com' (no trailing slash)

**token**: string 'prjX-....'

### Get all categories in tree like mode

```javascript
client.getCategories(): CategoryNode[]
```

### Get list of categories

```javascript
client.listCategories(listRequest);
```

### Get category by id

```javascript
client.getCategory(id);
```

### Get list of products

```javascript
client.listProducts(listRequest);
```

### Get product by id

```javascript
client.getProduct(id);
```

### Checkout process

```javascript
const iframe = client.createCheckout(
  document.querySelector("#checkout"),
  [{ uid: String(product.id), amount: 1 }],
  { layout: { ".fields .label": { textDecoration: "underline" } } },
  (order: Order) => {
    console.log("created order", order);
    iframe;
  }
);
```

arguments

```
  app: HTMLElement,
  items: Item[],
  options: { layout?: { [key: string]: any } },
  success: (order: Order) => {}
```

# Types

```typescript
interface ListRequest {
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
```

```typescript
interface ListResponse {
  Data: any[];
  Page: number;
  Filtered: number;
  Total: number;
}
```

```typescript
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
```

```typescript
export interface CategoryNode extends Category {
  children?: CategoryNode[];
}
```

```typescript
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
```

```typescript
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
```
