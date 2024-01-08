# Build

npm install

npm run build

npm pack --pack-destination builds/

# Types

```
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

```
interface ListResponse {
  Data: any[];
  Page: number;
  Filtered: number;
  Total: number;
}
```

```
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

```
export interface CategoryNode extends Category {
  children?: CategoryNode[];
}
```

```
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

```
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

# Examples

Install

```
npm install salesbit-api-client
```

Import

```
import {APIClient} from 'salesbit-api-client'
```

Create instance

```
const client = new APIClient(url, token);
```

where **url**: string like this 'https://api.site.com' (no trailing slash)

**token**: string 'prjX-....'

Get all categories in tree like mode

```
client.getCategories(): CategoryNode[]
```

Get list of categories

```
client.listCategories(listRequest)
```

Get category by id

```
client.getCategory(id)
```

Get list of products

```
client.listProducts(listRequest)
```

Get product by id

```
client.getProduct(id)
```
