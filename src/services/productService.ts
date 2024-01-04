import apiConfig from "@config/apiConfig";

const productService = {
  getAll: async () => {
    const response = await fetch(apiConfig.base_url, {
      method: "GET",
      cache: "no-store",
      headers: apiConfig.header_setting,
    });

    return await response.json();
  },
  getByID: async (id: string) => {
    const response = await fetch(`${apiConfig.base_url}/${id}`, {
      method: "GET",
      cache: "no-store",
      headers: apiConfig.header_setting,
    });

    return response;
  },
};

export default productService;
