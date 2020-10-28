context("search autocomplete", ()=> {

    //테스트 전에 api에서 리스트를 불러온다.
    before(()=>{
        cy.request(`${Cypress.env('apiBaseUrl')}/v1/events?1603892003747&sort=deadline`)
            .then((response) => {
                cy.writeFile('cypress/fixtures/events.json', response.body)
            })
        cy.fixture('events.json').as('eventsJson')
    })

    // 이벤트 api에서 준 타이틀들이 보이는지 확인한다. 
    it("Verify that API results are output",() => {
        cy.visit('/events')
        cy.get('@eventsJson').then((result)=>{
            let res = result.data;
            res.map((v)=>{
                cy.xpath(`//h2[text()="${v.title}"]`)
                    .should('be.visible')
            })
        })
    })
    
})