import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ProjectLanguage } from "@api/projects.types";
import { useGetProjects } from "@features/projects";
import { useGetIssues } from "../../api/use-get-issues";
import { IssueRow } from "./issue-row";
import styles from "./issue-list.module.scss";
import Select from "../../../ui/select/select";
import Input from "features/ui/input/input";
import Image from "next/image";
import { FaMagnifyingGlass } from "react-icons/fa6";
import bgCircle from "../../icons/bgCircle.svg";
import Cloud from "../../icons/Cloud.svg";
import CircleFilled from "../../icons/CircleFilled.svg";
import featSearch from "../../icons/featSearch.svg";

export function IssueList() {
  const router = useRouter();
  const page = Number(router.query.page || 1);
  const stat = router.query.status;
  const lev = router.query.level;
  const proj = router.query.project;
  const [statusVal, setStatusVal] = useState<boolean | string | string[]>(
    stat || "",
  );
  const [levelVal, setLevelVal] = useState<boolean | string | string[]>(
    lev || "",
  );
  const [clearString, setClearString] = useState<string>("");

  useEffect(() => {
    // set menu hooks when clearing filter and on reload
    function capitalizeFirstLetter(string: string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    if (typeof stat === "string") {
      if (stat === "open") {
        setStatusVal("Unresolved");
      } else {
        setStatusVal(capitalizeFirstLetter(stat));
      }
    }
    if (typeof lev === "string") {
      setLevelVal(capitalizeFirstLetter(lev));
    }
  }, [clearString, stat, lev]);

  const navigateToPage = (newPage: number) => {
    router.push({
      pathname: router.pathname,
      query: {
        page: newPage,
        status: stat,
        level: lev,
        project: proj,
      },
    });
  };
  const issuesPage = useGetIssues(page, stat, lev, proj);
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
  // if total page of previous search is less than new search params, go to page 1
  if (meta.totalPages < meta.currentPage) {
    navigateToPage(1);
  }

  // ================  parse & set filter values, set to URL ==========================

  function setURL(menuVal: string) {
    let resParam = router.query.status;
    let levParam = router.query.level;

    let val;
    if (menuVal.includes("res-")) {
      val = menuVal.split("-");
      if (val[1] === "false") {
        resParam = undefined;
      } else {
        resParam = val[1];
      }
    } else {
      val = menuVal.split("-");
      if (val[1] === "false") {
        levParam = undefined;
      } else {
        levParam = val[1];
      }
    }

    // set values on page load, if no selections made
    if (resParam === undefined) {
      resParam = "default";
    }
    if (levParam === undefined) {
      levParam = "default";
    }

    pushPath(resParam, levParam);
  }

  function pushPath(
    status: string | string[] | undefined,
    level: string | string[] | undefined,
    text?: string,
  ) {
    router.push({
      pathname: router.pathname,
      query: {
        page: page,
        status: status,
        level: level,
        project: text,
      },
    });
  }

  function clearMenu() {
    setClearString("");
    pushPath(undefined, undefined, undefined); // this also clears the state values for menus
  }
  //======================  menu selection behaviour =====
  function setRes(val: string | boolean) {
    // const resVal;
    if (val === "Unresolved") {
      val = "open";
    }
    const resVal = "res-" + val;
    setURL(resVal.toLowerCase());
  }
  function setLev(val: string | boolean) {
    // let levVal;
    const levVal = "lev-" + val;
    setURL(levVal.toLowerCase());
  }

  // =======  fetch data, filter returned data based on text, re-load
  function filterSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const text = event.target.value;
    setClearString(text);
    pushPath(stat, lev, text);
  }
  // ================== menuList content
  const resolveMenu = [
    { id: 0, value: false, item: "--" },
    { id: 1, value: "Resolved", item: "Resolved" },
    { id: 2, value: "Unresolved", item: "Unresolved" },
  ];

  const levelMenu = [
    { id: 0, value: false, item: "--" },
    { id: 1, value: "Error", item: "Error" },
    { id: 2, value: "Warning", item: "Warning" },
    { id: 3, value: "Info", item: "Info" },
  ];
  // ======  Define the menuList type/content based on the menuList property
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
        {/* <div className={styles.buttonContainer}>
          <button className={styles.resolveButton}></button>
        </div> */}
        <div className={styles.filterContainer}>
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
              value={statusVal}
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
              placeholder="Levels?"
              value={levelVal}
            />
          </div>
          <div className={styles.fieldContainer}>
            <Input
              isDisabled={false}
              isIcon={true}
              inputLabel=""
              isError={false}
              hint=""
              noHint={false}
              errorMess=""
              // children
              icon={<FaMagnifyingGlass />}
              onChange={filterSearch}
              value={clearString}
            ></Input>
          </div>
        </div>
      </div>
      {items.length > 1 ? (
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
              {(items || []).map((issue) => (
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
              Page{" "}
              <span className={styles.pageNumber}>{meta?.currentPage}</span> of{" "}
              <span className={styles.pageNumber}>{meta?.totalPages}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.noTable}>
          <div className={styles.emptyItems}>
            <div className={styles.emptyContent}>
              <div className={styles.illustration}>
                <Image
                  src={bgCircle}
                  alt="bgCircle"
                  className={styles.bgCircle}
                />
                <Image src={Cloud} alt="cloud" className={styles.cloud} />
                <Image
                  src={CircleFilled}
                  alt="circleSM"
                  className={styles.circleSM}
                />
                <Image
                  src={CircleFilled}
                  alt="circleMD"
                  className={styles.circleMD}
                />
                <Image
                  src={CircleFilled}
                  alt="circleLG"
                  className={styles.circleLG}
                />
                <Image
                  src={CircleFilled}
                  alt="circleLG"
                  className={styles.circleLgB}
                />
                <div className={styles.featIconBG}>
                  <Image
                    src={featSearch}
                    alt="featureIcon"
                    className={styles.featSearch}
                  />
                </div>
              </div>
              <div className={styles.noIssueBlock}>
                <div className={styles.noIssueHeader}>No Issues found</div>
                <div className={styles.noIssueText}>
                  Either the filters you selected are too restricive or there
                  are no issues for your projects.
                </div>
              </div>
            </div>
            <div className={styles.buttonCase}>
              <button
                className={styles.emptyButton}
                onClick={() => {
                  clearMenu();
                }}
              >
                Clear filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
