/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

const user = {
  name: faker.internet.userName(),
  password: 'Qwerty123!'
}

describe('Demoblaze', () => {
  beforeEach(() => {
    cy.visit('https://www.demoblaze.com/');
  });

  it('Should register user with valid data', () => {
    cy.get('#signin2').click();
    cy.get('#sign-username').type(user.name, {force: true});
    cy.get('#sign-password').type(user.password, {force: true});
    cy.contains('button', 'Sign up').click({force: true});
    cy.on('window:alert', (text) => {
      expect(text).to.eq('Sign up successful.')                             
    })
  });

  it('Should login registered user with valid data', () => {
    cy.get('#login2').click();
    cy.get('#loginusername').type('Jovanny68', {force: true});
    cy.get('#loginpassword').type(user.password, {force: true});
    cy.contains('button', 'Log in').click({force: true});
    cy.get('#logout2').should('be.visible');
    cy.get('#nameofuser').should('contain', 'Welcome Jovanny68');
  });

  it('Should provide possibility to add a good to the cart', () => {
    cy.contains('.hrefch', 'Samsung galaxy s6').click();
    cy.contains('.btn', 'Add to cart').click();
    cy.on('window:alert', (text) => {
      expect(text).to.eq('Product added.')
    });
    cy.get('#cartur').click();
    cy.wait(1000);
    cy.contains('.success', 'Samsung galaxy s6').should('be.visible');
  });
});
