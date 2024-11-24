import axios from "axios";

const API_BASE_URL = "http://localhost:1337/api";

const api = axios.create({
    baseURL: API_BASE_URL
});

export const getAllManga = async (page = 1, perPage = 10) => {
  
  try {
    const response = await api.get('/manga', {
      params: {
          page: page,
          per_page: perPage
      }
    });
    return response.data;

  } catch (error) {
    return error
  }
};

export const getManga = async (id: string) => {
  const response = await api.get(`/manga/${id}`);
  return response.data;
};

// Add more API calls as needed


export default api;
