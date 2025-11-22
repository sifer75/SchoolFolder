import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export function useTypedQuery<
  TData,
  TError = Error,
  TQueryKey extends unknown[] = unknown[],
>(
  queryKey: TQueryKey,
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) {
  return useQuery<TData, TError>({
    queryKey,
    queryFn,
    ...options,
  });
}
