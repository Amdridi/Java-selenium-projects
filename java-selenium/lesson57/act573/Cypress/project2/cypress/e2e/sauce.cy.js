/// ＜reference types="cypress" /＞


    ///************** CASE 1 log In log out**************//
beforeEach('log in',() => {
    cy.visit('https://pharma-shop.tn/ ');
    cy.viewport(1280, 720)
    cy.get('.popup-title > span').click()
    cy.get('#login-form > section > :nth-child(2) > div.col-md-12 > .form-control').type('ameni.dridi.ing@gmail.com')
    cy.get('.input-group > .form-control').type('Ameni2023')
    cy.get('#submit-login').click()
  });

after('log in',()=>{
    cy.get('.logout').click()
    cy.get('.text-sm-center > a').click()


});



    ///**************case2 additem and check it out **************//
it('add item ', function() {
    cy.get('.leo-top-menu > .nav > :nth-child(1) > .nav-link').click()
    cy.get(':nth-child(1) > .product-miniature > .thumbnail-container > .product-meta > .functional-buttons > #add-to-cart-or-refresh > .btn').click()
    cy.wait(3000)
    cy.get('#myModalLabel').contains('ajouté')
    cy.get('.cart-content-btn > .btn-secondary').click

 });


   ///**************case3 addmultipleitem and rid of them **************//
it('add multiple item test', function() {
    for (let i = 0; i < 2; i++){
    cy.get('.leo-top-menu > .nav > :nth-child(1) > .nav-link').click()
    cy.get('#js-product-list').find('article')
    .eq(i)
    .find('button').click()
    cy.wait(3000)
    cy.get('.cart-content-btn > .btn-secondary').click()
    }

    cy.get('#cart-block').click()
    cy.get('.cart-dropdow-viewcart').click()
    for (let i = 0; i < 1; i++){
    cy.get('.cart-items').find('li')
    .eq(1)
    .find('.remove-from-cart').click()
    }
    
 });

 ///**************case4 reverse sort item **************//

 it ('revers sorting item', function() {
 cy.get('.leo-top-menu > .nav > :nth-child(1) > .nav-link').click()
 cy.get('.btn-unstyle > .material-icons').click()
 cy.get('[href="https://pharma-shop.tn/839-visage?order=product.name.desc"]').click()
 })










