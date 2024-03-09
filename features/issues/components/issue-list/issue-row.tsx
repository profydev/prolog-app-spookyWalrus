import capitalize from "lodash/capitalize";
import { Badge, BadgeColor, BadgeSize } from "@features/ui";
import { ProjectLanguage } from "@api/projects.types";
import { IssueLevel } from "@api/issues.types";
import type { Issue } from "@api/issues.types";
import styles from "./issue-row.module.scss";
import Chart from "./rowChart";

type IssueRowProps = {
  projectLanguage: ProjectLanguage;
  issue: Issue;
};

const levelColors = {
  [IssueLevel.info]: BadgeColor.success,
  [IssueLevel.warning]: BadgeColor.warning,
  [IssueLevel.error]: BadgeColor.error,
};

export function IssueRow({ projectLanguage, issue }: IssueRowProps) {
  const { name, message, stack, level, numEvents, numUsers } = issue;
  const firstLineOfStackTrace = stack.split("\n")[1];
  return (
    <div className={styles.row} data-testid="issue-row">
      <div className={styles.issueCell}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.languageIcon}
          src={`/icons/${projectLanguage}.svg`}
          alt={projectLanguage}
        />
        <div>
          <div className={styles.errorTypeAndMessage}>
            <span className={styles.errorType}>{name}:&nbsp;</span>
            {message}
          </div>
          <div className={styles.stackTraceText}>{firstLineOfStackTrace}</div>
        </div>
      </div>
      <div className={styles.middleCells}>
        <div className={styles.cell}>
          <div className={styles.cellLabel}>Status</div>
          <div className={styles.badge}>
            <Badge color={levelColors[level]} size={BadgeSize.sm}>
              {capitalize(level)}
            </Badge>
          </div>
        </div>
        <div className={styles.cell}>
          <div className={styles.cellLabel}>Events</div>
          {numEvents}
        </div>
        <div className={styles.cell}>
          <div className={styles.cellLabel}>Users</div>
          {numUsers}
        </div>
      </div>
      <div className={styles.lastCell}>
        <Chart />
      </div>
    </div>
  );
}
