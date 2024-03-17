import { axios } from "./axios";
import type { Project } from "./projects.types";

const ENDPOINT = "/project";
// const ENDPOINT2 = "/issues/{id}";

export async function getProjects() {
  const { data } = await axios.get<Project[]>(ENDPOINT);
  return data;
}

// export async function getFiltProjects(id: string|string[]):Promise<Project> {
//   const { data } = await axios.get<Project[]>(ENDPOINT2, {
//     params: { projectId: id },
//   });
//   return data;
// }
