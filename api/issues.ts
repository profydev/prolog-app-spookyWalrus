import { axios } from "./axios";
import type { Issue } from "./issues.types";
import type { Page } from "@typings/page.types";

const ENDPOINT = "/issue";

export async function getIssues(
  page: number,
  options?: { signal?: AbortSignal },
) {
  const { data } = await axios.get<Page<Issue>>(ENDPOINT, {
    params: { page },
    signal: options?.signal,
  });
  return data;
}

export async function getFiltered(
  page: number,
  status: string | string[] | undefined | null,
  level: string | string[] | undefined | null,
  projectId?: string | null | string[] | undefined,
  options?: { signal?: AbortSignal },
) {
  if (projectId) {
    const { data } = await axios.get<Page<Issue>>(ENDPOINT, {
      params: { page: page, projectId: projectId },
      signal: options?.signal,
    });
    data.items = data.items.filter((issue) => issue.projectId === projectId);
    return data;
  }
  const { data } = await axios.get<Page<Issue>>(ENDPOINT, {
    params: { page: page, status: status, level: level },
    signal: options?.signal,
  });
  return data;
}
