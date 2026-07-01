import { useQuery } from "@tanstack/react-query";
import { eventsApi } from "../api/eventsApi.js";

export function useMatches(params = {}) {
  return useQuery({
    queryKey: ["matches", params],
    queryFn: async () => {
      const response = await eventsApi.getMatches(params);
      return response; // { data, meta }
    },
  });
}

export function useMatch(id) {
  return useQuery({
    queryKey: ["match", id],
    queryFn: async () => {
      const response = await eventsApi.getMatchById(id);
      return response.data;
    },
    enabled: Boolean(id), // don't fire the query if id is undefined
  });
}

export function useRelatedMatches(id, params = {}) {
  return useQuery({
    queryKey: ["match", id, "related", params],
    queryFn: async () => {
      const response = await eventsApi.getRelatedMatches(id, params);
      return response.data;
    },
    enabled: Boolean(id),
  });
}

export function useSearchMatches(q, params = {}) {
  return useQuery({
    queryKey: ["matches", "search", q, params],
    queryFn: async () => {
      const response = await eventsApi.searchMatches(q, params);
      return response.data;
    },
    enabled: q.trim().length >= 2, // mirrors backend validation — don't fire on 1 char
  });
}
