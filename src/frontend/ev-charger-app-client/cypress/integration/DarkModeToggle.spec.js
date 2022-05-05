import { mount } from '@cypress/vue'
import DarkModeToggle from "../../src/components/DarkModeToggle";

describe('HelloWorld', () => {
  it('renders a message', () => {
    const msg = 'Hello Cypress Component Testing!'
    mount(DarkModeToggle, {
      propsData: {
        msg
      }
    })

    cy.get('h1').should('have.text', msg)
  })
})