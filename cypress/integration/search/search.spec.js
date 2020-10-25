context("search autocomplete", ()=> {
    let search = 'QA'

    beforeEach(() => {
        cy.visit('https://www.wanted.co.kr/')
        cy.request(`https://www.wanted.co.kr/api/v4/search/related?1603005379533&query=${search}`)
            .then((response) => {
                cy.writeFile('cypress/fixtures/search.json', response.body)
            })
        cy.fixture('search.json').as('searchJson')
    })
    
    it('Compare autocomplete results with api results', () => {
        cy.get('[data-gnb-kind=search]')
            .click()
        cy.get('[type=search]')
            .type(`${search}`)
        cy.get('@searchJson').then((result)=>{
            let res = result;
            cy.get('._32Fl8XCR8miTjZJ0LVGaha > li')
                .eq(4).should('have.text', res.data.companies[0].name)
        })
    })
})