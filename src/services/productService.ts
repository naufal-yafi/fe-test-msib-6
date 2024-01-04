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
  getByID: async (id: string): Promise<ProductType> => {
    const response = await fetch(`${apiConfig.base_url}/${id}`, {
      method: "GET",
      cache: "no-store",
      headers: apiConfig.header_setting,
    });

    return (await response.json()).data as ProductType;
  },
};

export default productService;
