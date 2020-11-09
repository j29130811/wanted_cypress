context("Event", ()=> {

    //테스트 전에 api에서 리스트를 불러온다.
    before(()=>{
        cy.request(`${Cypress.env('apiBaseUrl')}/v1/events?1603892003747&sort=deadline`)
            .then((response) => {
                cy.writeFile('cypress/fixtures/events.json', response.body)
            })
        cy.fixture('events.json').as('eventsJson')
    })

    it("Events API의 Title이 출력되어야 한다.",() => {
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