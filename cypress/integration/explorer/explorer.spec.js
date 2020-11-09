context("Explorer", ()=> {
    let currentGetTime = new Date().getTime();

    //테스트 전에 jobs api 결과를 events.json으로 저장한다.
    before(()=>{
        cy.request(`https://www.wanted.co.kr/api/v4/jobs?1604908464701&country=kr&job_sort=job.latest_order&locations=all&years=-1`)
            .then((response) => {
                cy.writeFile('cypress/fixtures/jobs.json', response.body)
            })
        cy.fixture('jobs.json').as('jobsJson')
    })

    it("Jobs API의 Company 들의 Title이 출력되어야 한다.",() => {
        cy.visit('/')
        cy.xpath('//a[text()=\'탐색\']')
            .click()
        cy.get('@jobsJson').then((result)=>{
            let res = result.data;
            res.map((v)=>{
                cy.xpath(`//div[text()="${v.company.name}"]`)
                    .should('be.visible')
            })
        })
    })
    
})