import { ProjectCard } from "../project-card";
import { useGetProjects } from "../../api/use-get-projects";
import styles from "./project-list.module.scss";
import Image from "next/image";
import { Button } from "@features/ui";
// import Link from "next/link";

export function ProjectList() {
  const { data, isLoading, isError, error, refetchProjects } = useGetProjects();

  if (isLoading) {
    return (
      <div className={styles.loadingIndicator}>
        <div className={styles.loadingContent}>
          <Image
            className={styles.loadingCircle}
            src={"icons/loading-circle.svg"}
            width={64}
            height={64}
            alt="loading-circle"
          />
        </div>
      </div>
    );
  }

  if (isError) {
    console.error(error);
    return (
      // <div>Error: {error.message}</div>;)
      <div className={styles.alertBox}>
        <Image
          src={"icons/alert-circle.svg"}
          width={20}
          height={20}
          alt="alert-circle"
        />
        <div className={styles.content}>
          <div className={styles.supportingText}>
            There was a problem while loading the project data
          </div>
          <div className={styles.actions}>
            <Button className={styles.button}>
              <div className={styles.buttonBase}>
                <div
                  onClick={() => refetchProjects()}
                  className={styles.tryAgain}
                >
                  Try Again
                </div>
                <Image
                  src="icons/arrow-right.svg"
                  width={20}
                  height={20}
                  alt="arrow-right"
                />
              </div>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {data?.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
