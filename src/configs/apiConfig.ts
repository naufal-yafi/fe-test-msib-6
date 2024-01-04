const apiConfig = {
  base_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/data`,
  header_setting: {
    "Content-Type": "application/json",
    nim: process.env.NEXT_PUBLIC_HEADERS_NIM ?? "212400057",
  },
};

export default apiConfig;
