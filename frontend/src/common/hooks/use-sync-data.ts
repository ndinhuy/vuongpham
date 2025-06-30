import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";

export const useSyncQueryData = <T>(
  queryKey: string[],
  mutationCallback: (data: T | undefined) => T | undefined,
  deps?: Array<any>,
) => {
  const queryClient: QueryClient = useQueryClient();

  const syncQueryData = () => {
    queryClient.setQueryData<T>(queryKey, mutationCallback);
  };

  useEffect(() => {
    syncQueryData();
  }, [...(deps || [])]);

  return { syncQueryData };
};
