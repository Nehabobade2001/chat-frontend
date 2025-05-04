// // src/api/geminiApi.ts
// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/gemini'; // adjust if your backend URL is different

// export const generateWebsite = async (prompt: string) => {
//   const response = await axios.post(`${API_URL}/generate`, { prompt });
//   return response.data;
// };

// export const getWebsiteById = async (id: number) => {
//   const response = await axios.get(`${API_URL}/history/${id}`);
//   return response.data;
// };

// export const getAllWebsites = async () => {
//   const response = await axios.get(`${API_URL}/history`);
//   return response.data;
// };

// export const deleteWebsite = async (id: number) => {
//   const response = await axios.delete(`${API_URL}/delete/${id}`);
//   return response.data;
// };

// export const updateWebsite = async (id: number, prompt: string) => {
//   const response = await axios.patch(`${API_URL}/update/${id}`, { prompt });
//   return response.data;
// };





import axios from 'axios';

const api = axios.create({
  baseURL: 'https://chat-backend-mimc.onrender.com/api/gemini',
});

export default api;
