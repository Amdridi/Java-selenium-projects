describe("Hero Team Selector", () => {
beforeEach(() => {
      cy.visit("http://localhost:4200");
      cy.intercept('/hero', { fixture: 'hero.json' });
    cy.intercept('/wicked', { fixture: 'wicked.json' });
    cy.visit("http://localhost:4200");
    });

    
  
    it("Application footer contain copyright text", () => {
      cy.get(".app--footer")
        .find("p")
        .should("contain.text", "© Ineat Group - iLab Team.");
    });
  });


