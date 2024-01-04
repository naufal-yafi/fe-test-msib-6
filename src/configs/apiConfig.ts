const apiConfig = {
  base_url: `${process.env.API_BASE_URL}/data`,
  header_setting: {
    "Content-Type": "application/json",
    nim: process.env.HEADERS_NIM ?? "212400057",
  },
};

export default apiConfig;
