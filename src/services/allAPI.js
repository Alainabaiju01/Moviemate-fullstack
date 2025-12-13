import axios from "axios";

const BASE_URL = "https://moviemate-backend-g5qx.onrender.com"; // Flask backend

// GET wishlist
export const getWishlistAPI = async () => {
  const res = await axios.get(`${BASE_URL}/wishlist`);
  return res.data;
};

// ADD movie to wishlist
export const addWishlistAPI = async (movie) => {
  const res = await axios.post(`${BASE_URL}/wishlist`, movie);
  return res.data;
};

// DELETE movie from wishlist
export const removeWishlistAPI = async (id) => {
  const res = await axios.delete(`${BASE_URL}/wishlist/${id}`);
  return res.data;
};



// Get currently watching list
export const getWatchingAPI = async () => {
  const res = await axios.get(`${BASE_URL}/watching`);
  return res.data;
};

// Add movie/show to watching
export const addWatchingAPI = async (data) => {
  const res = await axios.post(`${BASE_URL}/watching`, data);
  return res.data;
};

// Update progress (minutes watched / episode)
export const updateWatchingAPI = async (id, updateData) => {
  const res = await axios.put(`${BASE_URL}/watching/${id}`, updateData);
  return res.data;
};

// Remove from watching
export const removeWatchingAPI = async (id) => {
  const res = await axios.delete(`${BASE_URL}/watching/${id}`);
  return res.data;
};

/* =========================
   WATCHED APIs
========================= */

// Get watched list
export const getWatchedAPI = async () => {
  const res = await axios.get(`${BASE_URL}/watched`);
  return res.data;
};

// Add to watched list
export const addWatchedAPI = async (movie) => {
  const res = await axios.post(`${BASE_URL}/watched`, movie);
  return res.data;
};

// Remove from watched list
export const removeWatchedAPI = async (id) => {
  const res = await axios.delete(`${BASE_URL}/watched/${id}`);
  return res.data;
};