import { useGetShopsQuery } from "../store/api";

export const useShops = () => {
  return useGetShopsQuery();
};
