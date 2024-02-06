import { useState } from "react";
import { useRouter } from "next/router";
import { ProjectLanguage } from "@api/projects.types";
import { useGetProjects } from "@features/projects";
import { useGetIssues } from "../../api/use-get-issues";
import { IssueRow } from "./issue-row";
import styles from "./issue-list.module.scss";
import Select from "../../../ui/select/select";
// import Input from "features/ui/input/input";
import { Issue } from "@api/issues.types";
// import Image from "next/image";
// import Icon from "../../../../public/icons/support.svg";
// import Icon from "public/icons/support.svg";
// import Checkbox from "../../../ui/checkbox/checkbox";

export function IssueList() {
  const [isResolve, setResolve] = useState<string>("no selection");
  const [isLevel, setLevel] = useState<string>("no selection");
  const [isSearch, setSearch] = useState<string>("");
  const [finalList, setFinalList] = useState<Issue[] | null>(null);
  console.log("states at: ", isResolve, isLevel, isSearch);

  const router = useRouter();
  const page = Number(router.query.page || 1);
  const navigateToPage = (newPage: number) => {
    router.push({
      pathname: router.pathname,
      query: { page: newPage },
    });
    setRes(isResolve);
  };

  const issuesPage = useGetIssues(page);
  const projects = useGetProjects();

  if (projects.isLoading || issuesPage.isLoading) {
    return <div>Loading</div>;
  }

  if (projects.isError) {
    console.error(projects.error);
    return <div>Error loading projects: {projects.error.message}</div>;
  }

  if (issuesPage.isError) {
    console.error(issuesPage.error);
    return <div>Error loading issues: {issuesPage.error.message}</div>;
  }

  const projectIdToLanguage = (projects.data || []).reduce(
    (prev, project) => ({
      ...prev,
      [project.id]: project.language,
    }),
    {} as Record<string, ProjectLanguage>,
  );
  const { items, meta } = issuesPage.data || {};
  //indices ==================================== each indiv. issue, filter looks at these categories for every issue

  function setRes(val: string) {
    setResolve(val);
    filterSearch(isSearch, filterLevels(isLevel, filterResolve(val)));
  }
  function setLev(val: string) {
    setLevel(val);
    filterSearch(isSearch, filterLevels(val, filterResolve(isResolve)));
  }
  function setSer(event: React.ChangeEvent<HTMLInputElement>) {
    const text = event.target.value;
    setSearch(text);
    filterSearch(text, filterLevels(isLevel, filterResolve(isResolve)));
  }

  function filterResolve(resstate: string) {
    if (resstate === "--") {
      return items;
    } else {
      const nuResp = items.filter((val) => {
        if (resstate.toLowerCase() === "unresolved") {
          if (val.status === "open") {
            return val;
          }
        } else if (resstate.toLowerCase() === "resolved") {
          if (val.status === "resolved") {
            return val;
          }
        }
      });
      return nuResp;
    }
  }

  function filterLevels(level: string, list: Issue[]) {
    if (level === "--") {
      return list;
    } else {
      const nuLevels = list.filter((val) => {
        if (val.level === level.toLowerCase()) {
          return val;
        }
      });
      return nuLevels;
    }
  }

  function filterSearch(text: string, list: Issue[]) {
    if (text.length > 0) {
      const daList = list.filter((val) => {
        return val.name.toLowerCase().includes(text.toLowerCase());
      });
      return setFinalList(daList);
    } else {
      setFinalList(list);
    }
  }

  const resolveMenu = [
    { id: 0, value: "--", item: "--" },
    { id: 1, value: "Resolved", item: "Resolved" },
    { id: 2, value: "Unresolved", item: "Unresolved" },
  ];

  const levelMenu = [
    { id: 0, value: "--", item: "--" },
    { id: 1, value: "Error", item: "Error" },
    { id: 2, value: "Warning", item: "Warning" },
    { id: 3, value: "Info", item: "Info" },
  ];
  // Define the menuList type based on the setMenu property
  const getMenuList = (menuType: string) => {
    if (menuType === "resolve") {
      return resolveMenu;
    } else if (menuType === "level") {
      return levelMenu;
    }
    //default menu items
    return [
      { id: 1, value: "Thing", item: "Thing" },
      { id: 2, value: "More Things", item: "More Things" },
    ];
  };

  return (
    <div className={styles.section}>
      <div className={styles.filterbar}>
        <div className={styles.buttonContainer}>
          <button className={styles.resolveButton}></button>
        </div>
        <div className={styles.filterBlock}>
          <div className={styles.dropdownContainer}>
            <Select
              label=""
              hint=""
              errorMess=""
              isIcon={false}
              isDisabled={false}
              isError={false}
              className={styles.dropdown}
              onChange={setRes}
              menuList={getMenuList("resolve")}
              placeholder="Resolved ?"
            />
          </div>
          <div className={styles.dropdownContainer}>
            <Select
              label=""
              hint=""
              errorMess=""
              isIcon={false}
              isDisabled={false}
              isError={false}
              className={styles.dropdown}
              onChange={setLev}
              menuList={getMenuList("level")}
              placeholder="Levels"
            />
          </div>
          <div className={styles.fieldContainer}>
            {/* <Input
              isDisabled={false}
              isIcon={true}
              inputLabel=""
              isError={false}
              hint=""
              noHint={false}
              errorMess=""
              children
            />
            <Image src={Icon} alt="Icon" /> */}
            <input
              type="text"
              className={styles.inputField}
              onChange={setSer}
              placeholder="Project Name"
            ></input>
          </div>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.headerRow}>
              <th className={styles.headerCell}>
                {/* <Checkbox /> */}
                Issue
              </th>
              <th className={styles.headerCell}>Level</th>
              <th className={styles.headerCell}>Events</th>
              <th className={styles.headerCell}>Users</th>
            </tr>
          </thead>
          <tbody>
            {(finalList || items).map((issue) => (
              <IssueRow
                key={issue.id}
                issue={issue}
                projectLanguage={projectIdToLanguage[issue.projectId]}
              />
            ))}
          </tbody>
        </table>
        <div className={styles.paginationContainer}>
          <div>
            <button
              className={styles.paginationButton}
              onClick={() => navigateToPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              className={styles.paginationButton}
              onClick={() => navigateToPage(page + 1)}
              disabled={page === meta?.totalPages}
            >
              Next
            </button>
          </div>
          <div className={styles.pageInfo}>
            Page <span className={styles.pageNumber}>{meta?.currentPage}</span>{" "}
            of <span className={styles.pageNumber}>{meta?.totalPages}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
