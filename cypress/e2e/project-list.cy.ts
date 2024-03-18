import mockProjects from "../fixtures/projects.json";

describe("Project List", () => {
  beforeEach(() => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    // wait for request to resolve
    cy.wait("@getProjects");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("renders the projects", () => {
      const languageNames = ["React", "Node.js", "Python"];
      // const statuses = ["Critical", "Warning", "Stable"];
      function statusCg(stat: string) {
        console.log(stat);
        switch (stat) {
          case "info":
            return "Stable";
            break;
          case "error":
            return "Critical";
            break;
          case "warning":
            return "Warning";
          default:
            return "";
        }
      }

      // get all project cards
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          // check that project data is rendered
          cy.wrap($el).contains(mockProjects[index].name);
          cy.wrap($el).contains(languageNames[index]);
          cy.wrap($el).contains(mockProjects[index].numIssues);
          cy.wrap($el).contains(mockProjects[index].numEvents24h);
          const statusText = statusCg(mockProjects[index].status);
          cy.wrap($el).contains(statusText);
          cy.wrap($el)
            .find("a")
            .debug()
            .invoke("attr", "href")
            .then((href) => {
              expect(href).to.match(/\/dashboard\/issues\?id=.*/);
            });
          // .should("match", /\/dashboard\/issues\?id=.*/);
        });
    });
  });
});
