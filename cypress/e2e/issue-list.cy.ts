import mockIssues1 from "../fixtures/issues-page-1.json";
import mockIssues2 from "../fixtures/issues-page-2.json";
import mockIssues3 from "../fixtures/issues-page-3.json";

describe("Issue List", () => {
  beforeEach(() => {
    // setup request mocks
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");
    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=1", {
      fixture: "issues-page-1.json",
    }).as("getIssuesPage1");
    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=2", {
      fixture: "issues-page-2.json",
    }).as("getIssuesPage2");

    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=3", {
      fixture: "issues-page-3.json",
    }).as("getIssuesPage3");
    // ==== added custom intercept url for requests made by app...
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=2&status=&level=",
      {
        fixture: "issues-page-2.json",
      },
    ).as("getFix2");
    cy.intercept(
      "GET",
      "https://prolog-api.profy.dev/issue?page=3&status=&level=",
      {
        fixture: "issues-page-3.json",
      },
    ).as("getFix3");

    // open issues page
    cy.visit(`http://localhost:3000/dashboard/issues`);

    // wait for request to resolve
    cy.wait(["@getProjects", "@getIssuesPage1"]);
    cy.wait(500);

    // set button aliases
    cy.get("button").contains("Previous").as("prev-button");
    cy.get("button").contains("Next").as("next-button");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("renders the issues", () => {
      // cy.get("main")
      // .find("tbody")
      // .find("div")
      cy.get('[data-testid="issue-row"]').each(($el, index) => {
        const issue = mockIssues1.items[index];
        if (!issue) {
          console.error(`No issue found at index ${index}`);
          return;
        }
        const firstLineOfStackTrace = issue.stack.split("\n")[1].trim();
        cy.wrap($el).contains(issue.name);
        cy.wrap($el).contains(issue.message);
        cy.wrap($el).contains(issue.numEvents);
        cy.wrap($el).contains(firstLineOfStackTrace);
      });
    });

    it("paginates the data", () => {
      // test first page
      cy.contains("Page 1 of 3");
      cy.get("@prev-button").should("have.attr", "disabled");

      // test navigation to second page
      cy.get("@next-button").click();
      cy.wait(["@getFix2"]);
      cy.get("@prev-button").should("not.have.attr", "disabled");
      cy.contains("Page 2 of 3");
      cy.get("tbody div:first").contains(mockIssues2.items[0].message);

      // test navigation to third and last page
      cy.get("@next-button").click();
      cy.wait(["@getFix3"]);
      cy.get("@next-button").should("have.attr", "disabled");
      cy.contains("Page 3 of 3");
      cy.get("tbody div:first").contains(mockIssues3.items[0].message);

      // test navigation back to second page
      cy.get("@prev-button").click();
      cy.get("@next-button").should("not.have.attr", "disabled");
      cy.contains("Page 2 of 3");
      cy.get("tbody div:first").contains(mockIssues2.items[0].message);
    });

    it("persists page after reload", () => {
      cy.get("@next-button").click();
      cy.wait(["@getFix2"]);
      cy.contains("Page 2 of 3");
      cy.reload();
      cy.wait(["@getProjects", "@getIssuesPage2"]);
      cy.wait(1500);
      cy.contains("Page 2 of 3");
    });
  });
});
