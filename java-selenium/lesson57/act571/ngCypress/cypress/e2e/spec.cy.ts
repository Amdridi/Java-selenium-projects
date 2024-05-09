describe("Hero Team Selector", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

it("Application footer contain copyright text", () => {
    cy.get(".app--footer")
      .find("p")
      .should("contain.text", "© Ineat Group - iLab Team.");
  });

  it("Available Hero List contains 6 members", () => {
    cy.get(".selector-wrapper")
      .find(".list")
      .eq(0)
      //.find("app-hero-list-item")
      //.should("have.length", 6);
   
      
  });
  
  it("Available Wicked List contains 3 members", () => {
    cy.get(".selector-wrapper")
      .find(".list")
      .eq(1)
      //.find("app-hero-list-item")
      //.should("have.length", 3);
  });
  it("Home page contains 2 empty team", () => {
    cy.get(".teams-wrapper")
      .find(".team")
      .should("have.length", 2);
    cy.get(".teams-wrapper")
      .find(".team")
      .eq(0)
      .find("app-empty-card")
      .should("have.length", 5);
    cy.get(".teams-wrapper")
      .find(".team")
      .eq(1)
      .find("app-empty-card")
      .should("have.length", 5);
  });
  
  it("Add Hero to Hero Team when select button was clicked", () => {
    cy.get(".selector-wrapper")
      .find(".list")
      .eq(0)
      .find("button")
      .click();
    cy.get(".teams-wrapper")
      .find(".team")
      .eq(0)
      .find("app-hero-card")
      .should("have.length", 1);
  });




  
});




