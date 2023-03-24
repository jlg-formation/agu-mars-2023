describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Gestion Stock');
    cy.contains('Mentions Légales');
    cy.get('a').contains('Voir le stock').click();
    cy.get('a[title="Ajouter"]').click();
  });
});
