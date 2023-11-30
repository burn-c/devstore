describe('add product to cart', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should be able to navigate to the product page and add it to the cart', () => {
    cy.get('a[href^="/product"]').first().click()

    cy.location('pathname').should('include', '/product')
    cy.contains('button', 'Adicionar ao carrinho').click()

    cy.get('span[data-test="cartAmount"]').should(($span) => {
      const text = $span.text().trim()
      expect(text).to.equal('Cart (1)')
    })
  })

  it('should not count duplicated product on cart', () => {
    cy.get('a[href^="/product"]').first().click()

    cy.location('pathname').should('include', '/product')

    cy.contains('button', 'Adicionar ao carrinho').click()
    cy.contains('button', 'Adicionar ao carrinho').click()

    cy.get('span[data-test="cartAmount"]').should(($span) => {
      const text = $span.text().trim()
      expect(text).to.equal('Cart (1)')
    })
  })

  it('should be able to search for a product an add it to the cart', () => {
    cy.get('input[name=q').type('moletom').parent('form').submit()

    cy.get('a[href^="/product"]').first().click()

    cy.location('pathname').should('include', '/product')

    cy.contains('button', 'Adicionar ao carrinho').click()

    cy.get('span[data-test="cartAmount"]').should(($span) => {
      const text = $span.text().trim()
      expect(text).to.equal('Cart (1)')
    })
  })
})
