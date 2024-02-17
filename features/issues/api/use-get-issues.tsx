import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getIssues, getFiltered } from "@api/issues";
import type { Page } from "@typings/page.types";
import type { Issue } from "@api/issues.types";

const QUERY_KEY = "issues";

export function getQueryKey(page?: number) {
  if (page === undefined) {
    return [QUERY_KEY];
  }
  return [QUERY_KEY];
}

export function useGetFiltIssues(
  page: number,
  status?: string | string[] | undefined | null,
  level?: string | string[] | undefined | null,
) {
  if (status === "default" || undefined) {
    status = "";
  }
  if (level === "default" || undefined) {
    level = "";
  }
  const query = useQuery<Page<Issue>, Error>(
    getQueryKey(page),
    ({ signal }) => getFiltered(page, status, level, { signal }),
    { keepPreviousData: true },
  );
  // Prefetch the next page!
  const queryClient = useQueryClient();
  useEffect(() => {
    if (query.data?.meta.hasNextPage) {
      queryClient.prefetchQuery(getQueryKey(page + 1), ({ signal }) =>
        getFiltered(page + 1, status, level, { signal }),
      );
    }
  }, [query.data, page, status, level, queryClient]);
  console.log("call made: ", page, status, level);
  console.log("returned data: ", query.data);
  return query;
}
// =========  original =====================
export function useGetIssues(page: number) {
  const query = useQuery<Page<Issue>, Error>(
    getQueryKey(page),
    ({ signal }) => getIssues(page, { signal }),
    { keepPreviousData: true },
  );
  // Prefetch the next page!
  const queryClient = useQueryClient();
  useEffect(() => {
    if (query.data?.meta.hasNextPage) {
      queryClient.prefetchQuery(getQueryKey(page + 1), ({ signal }) =>
        getIssues(page + 1, { signal }),
      );
    }
  }, [query.data, page, queryClient]);

  return query;
}
//===== with no react-query ==========================
export async function theFilterList(
  page: number,
  status?: string | string[] | undefined,
  level?: string | string[] | undefined,
) {
  try {
    const newList = await getFiltered(page, status, level);
    // console.log("filtered List: ", newList);
    console.log("filtered : ", newList.items);
    return { data: newList, isLoading: false, isError: false };
  } catch (error) {
    console.log("an error: ", error);
    return { data: null, isLoading: false, isError: true, error };
  }
}
