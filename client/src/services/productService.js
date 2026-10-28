import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

export async function getProducts({
  page = 1,
  limit = 10,
  search = "",
  category = "",
} = {}) {
    const response = await api.get("/products", {
        params: {
            page, 
            limit, 
            search,
            category,
        },
    });

    return response.data;
}
