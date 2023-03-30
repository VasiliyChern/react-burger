const infoLogin = require('../fixtures/info-login.json');

describe('service burger-constructor is available', () => {
  beforeEach('should be available on localhost:3000', () => {
    cy.visit('http://localhost:3000');
  });

  it('open burger-constructor page', () => {
    cy.contains('Соберите бургер');
  });

  it('open/close modal window', () => {
    cy.get('[class^=burger-ingredient_container_ingredients]').first().click();
    cy.contains('Детали ингредиента');
    cy.contains('Калории');
    cy.contains('Углеводы');
    cy.wait(2000);
    cy.get('[class^=modal_header]').children().last().click();

    cy.get('[class^=burger-ingredient_container_ingredients]').last().click();
    cy.contains('Детали ингредиента');
    cy.contains('Белки');
    cy.contains('Жиры');
    cy.wait(2000);
    cy.get('[class^=modal_header]').children().last().click();
  })

  it('drag and drop ingredient', () => {
    cy.get('[class^=burger-ingredient_container_ingredients]').first().trigger('dragstart');
    cy.get('[class^=burger-constructor_container_layers]').trigger('drop');
    cy.get('#saucetab').next().children().first().trigger('dragstart');
    cy.get('[class^=burger-constructor_container_layers]').trigger('drop');
    cy.get('[class^=burger-ingredient_container_ingredients]').last().trigger('dragstart');
    cy.get('[class^=burger-constructor_container_layers]').trigger('drop');
    cy.get('[class^=burger-ingredient_container_ingredients]').last().prev().trigger('dragstart');
    cy.get('[class^=burger-constructor_container_layers]').trigger('drop');
  })

  it('make request order', () => {
    cy.get('[class^=burger-ingredient_container_ingredients]').first().trigger('dragstart');
    cy.get('[class^=burger-constructor_container_layers]').trigger('drop');
    cy.get('[class^=burger-ingredient_container_ingredients]').last().trigger('dragstart');
    cy.get('[class^=burger-constructor_container_layers]').trigger('drop');
    cy.get('.button').contains('Оформить заказ').click();

    cy.contains('Вход');
    cy.get('[class*=input_type_email]').children().last().type(infoLogin.login)
    cy.get('[class*=input_type_password]').children().first().next().type(infoLogin.password)
    cy.get('[class^=login_button]').children().first().click();
    cy.wait(3000);
    cy.get('.button').contains('Оформить заказ').click();
    cy.wait(20000);
    cy.contains('идентификатор заказа');
    cy.get('[class^=modal_header]').children().last().click();
  })

})