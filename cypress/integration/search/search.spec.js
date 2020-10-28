context("search autocomplete", ()=> {
    let search = 'QA'

    //search api에서 QA 검색 결과를 search.json으로 저장한다.
    before(() => {
        cy.visit('/')
        cy.request(`${Cypress.env('apiBaseUrl')}/v4/search/related?1603005379533&query=${search}`)
            .then((response) => {
                cy.writeFile('cypress/fixtures/search.json', response.body)
            })
        cy.fixture('search.json').as('searchJson')
    })
    
    //search에 검색어 입력 후, 보이는 리스트를 확인한다.
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