import login from '../support/pages/login'
import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'


describe('login', () => {

    context('quando submeto o formulário', () => {

        it('deve logar com sucesso', () => {

            const user = {
                name: 'Jeymeson',
                email: 'jeymeson@yahoo.com',
                password: 'pwd123'
            }

            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldBeLoggedIn(user.name)
        })

        it('não deve logar com senha incorreta', () => {

            const user = {
                name: 'Jeymeson',
                email: 'jeymeson@yahoo.com',
                password: '123456'
            }

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.noticeShouldBe(message)
        })

        it('não deve logar com e-mail não cadastrado', () => {

            const user = {
                name: 'Jeymeson',
                email: 'jeymeson@404.com',
                password: '123456'
            }

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.noticeShouldBe(message)
        })

        it('campos obrigatórios', () => {

            loginPage.submit()

            // Método mais fácil 

            // cy.contains('.alert-error', 'E-mail é obrigatório')
            //     .should('be.visible')

            // cy.contains('.alert-error', 'Senha é obrigatória')
            //     .should('be.visible')
            loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')


        })

    })

    context('senha muito curta', () => {

        const passwords = [
            '1',
            '12',
            '123',
            '1234',
            '12345'
        ]

        passwords.forEach((p) => {
            it(`não deve logar com a senha: ${p}`, () => {
                loginPage.submit('jeymeson@teste.com.br', p)
                loginPage.alertShouldBe('Pelo menos 6 caracteres')

            })
        })

    })

    context('email no formato incorreto', () => {

        const emails = [
            'jeymeson$gmail.com',
            'jeymeson.com.br',
            '@gmail.com',
            '@',
            'jeymeson@',
            '1223554',
            '$%&&',
            'xpto123'
        ]

        emails.forEach((e) => {
            it(`não deve logar com o email: ${e}`, () => {
                loginPage.submit(e, 'pwd123')
                loginPage.alertShouldBe('Informe um email válido')

            })
        })

    })

})