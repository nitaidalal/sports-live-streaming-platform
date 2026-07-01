import axiosClient from "./axiosClient.js";

export const eventsApi = {
  getMatches: async (params = {}) => {
    const { data } = await axiosClient.get("/matches", { params });
    return data; // { success, data: [...], meta: { pagination } }
  },

  getMatchById: async (id) => {
    const { data } = await axiosClient.get(`/matches/${id}`);
    return data; // { success, data: {...} }
  },

  getRelatedMatches: async (id, params = {}) => {
    const { data } = await axiosClient.get(`/matches/${id}/related`, {
      params,
    });
    return data;
  },

  searchMatches: async (q, params = {}) => {
    const { data } = await axiosClient.get("/matches/search", {
      params: { q, ...params },
    });
    return data;
  },
};
