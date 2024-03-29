import apiConfig from "@config/apiConfig";
import ProductType from "@type/product.type";

const productService = {
  getAll: async (): Promise<ProductType[]> => {
    const response = await fetch(apiConfig.base_url, {
      method: "GET",
      cache: "no-store",
      headers: apiConfig.header_setting,
    });

    return (await response.json()).data as ProductType[];
  },
  getByID: async (id: string | number): Promise<ProductType> => {
    const response = await fetch(`${apiConfig.base_url}/${id}`, {
      method: "GET",
      cache: "no-store",
      headers: apiConfig.header_setting,
    });

    return (await response.json()).data as ProductType;
  },
  addProduct: async (schema: ProductType): Promise<[number, ProductType]> => {
    const response = await fetch(apiConfig.base_url, {
      method: "POST",
      headers: apiConfig.header_setting,
      body: JSON.stringify(schema),
    });

    return [response.status, (await response.json()).data as ProductType];
  },
  deleteProduct: async (id: string | number | undefined): Promise<number> => {
    const response = await fetch(`${apiConfig.base_url}/${id}`, {
      method: "DELETE",
      headers: apiConfig.header_setting,
    });

    return response.status;
  },
  updateProduct: async (
    id: string | number | undefined,
    schema: ProductType,
  ): Promise<[number, ProductType]> => {
    const response = await fetch(`${apiConfig.base_url}/${id}`, {
      method: "PUT",
      headers: apiConfig.header_setting,
      body: JSON.stringify(schema),
    });

    return [response.status, (await response.json()).data as ProductType];
  },
};

export default productService;
