import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFiltered } from "@api/issues";
import type { Page } from "@typings/page.types";
import type { Issue } from "@api/issues.types";

const QUERY_KEY = "issues";

export function getQueryKey(
  page?: number,
  status?: string | string[] | null | undefined,
  level?: string | null | string[] | undefined,
) {
  if (page === undefined) {
    return [QUERY_KEY, page, status, level];
  }
  return [QUERY_KEY, page, status, level];
}

export function useGetIssues(
  page: number,
  status?: string | string[] | undefined | null,
  level?: string | string[] | undefined | null,
  project?: string | string[] | undefined,
) {
  if (status === "default" || undefined) {
    status = "";
  }
  if (level === "default" || undefined) {
    level = "";
  }

  const query = useQuery<Page<Issue>, Error>(
    getQueryKey(page, status, level),
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

  if (project) {
    const filtData = runFilter(project, query.data);
    if (filtData && query.data != undefined) {
      query.data.items = filtData || [];
    }
  }
  return query;
}

function runFilter(
  text: string | string[] | undefined | null,
  query: Page<Issue> | undefined,
) {
  if (typeof text === "string" && query != undefined) {
    const data = query.items || [];
    const daList = data.filter((val) => {
      if (typeof val.name === "string") {
        return val.name.toLowerCase().includes(text.toLowerCase());
      }
      return false;
    });
    return daList;
  }
}
