// hooks/useAuth.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getShops } from "../api/shops";
import type { Shops } from "../types/shops";

export const useShops = () => {
  const queryClient = useQueryClient();

  return useMutation<Shops[], Error, void>({
    mutationKey: ["shops"],
    mutationFn: () => getShops(),
    onSuccess: (data) => {
      queryClient.setQueryData(["shops"], data);
    },
  });
};
