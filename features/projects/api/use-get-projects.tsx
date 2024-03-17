import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@api/projects";
import type { Project } from "@api/projects.types";

export function useGetProjects() {
  const queryInfo = useQuery<Project[], Error>(["projects"], getProjects);
  const refetchProjects = async () => {
    await queryInfo.refetch();
  };
  return { ...queryInfo, refetchProjects };
}
