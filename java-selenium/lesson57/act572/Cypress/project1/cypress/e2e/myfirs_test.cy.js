/// ＜reference types="cypress" /＞

///////////senario1/////////


it('login test', function() {
    cy.visit('http://demo.guru99.com/test/newtours/')
    cy.get('[width="77"]').click()
    cy.get(':nth-child(2) > [style="font-family:Arial, Helvetica;font-size:13px;color:#000;padding:5px;"] > input').type('ameni ')
    cy.get(':nth-child(3) > [style="font-family:Arial, Helvetica;font-size:13px;color:#000;padding:5px;"] > input').type('dridi')
    cy.get(':nth-child(4) > [style="font-family:Arial, Helvetica;font-size:13px;color:#000;padding:5px;"] > input').type('999999')
    cy.get('#userName').type('ameni.dridi.ing<àgmail.com')
    cy.get(':nth-child(7) > [style="font-family:Arial, Helvetica;font-size:13px;color:#000;padding:5px;"]').type('Ibn Mandhour')
    cy.get(':nth-child(8) > [style="font-family:Arial, Helvetica;font-size:13px;color:#000;padding:5px;"] > input').type('Bizerte')
    cy.get(':nth-child(9) > [style="font-family:Arial, Helvetica;font-size:13px;color:#000;padding:5px;"] > input').type('Tunisia')
    cy.get(':nth-child(10) > [style="font-family:Arial, Helvetica;font-size:13px;color:#000;padding:5px;"] > input').type('7000')
    cy.get('select').select(10)
    cy.get('#email').type('ameni')
    cy.get(':nth-child(14) > [style="font-family:Arial, Helvetica;font-size:13px;color:#000;padding:5px;"] > input').type("aaaaa")
    cy.get(':nth-child(15) > [style="font-family:Arial, Helvetica;font-size:13px;color:#000;padding:5px;"] > input').type("aaaaa")
    cy.get(':nth-child(17) > td > input').click()

})


///////////senario2/////////

it('create account', function(){ 
    cy.visit('http://demo.guru99.com/test/newtours/') 
    cy.get('[width="67"] > a').click() 
    cy.get(':nth-child(1) > [style="font-family:Arial, Helvetica;font-size:13px;color:#000;padding:5px;"] > input').type('ameni')
    cy.get(':nth-child(2) > [style="font-family:Arial, Helvetica;font-size:13px;color:#000;padding:5px;"] > input').type('aaaaa')
    cy.get(':nth-child(4) > td > input').click(); })