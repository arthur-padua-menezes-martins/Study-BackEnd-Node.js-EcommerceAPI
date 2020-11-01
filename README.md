# **[ E-COMMERCE API ]**
> ## Tecnologias do Projeto

> #### TypeScript
* *velocidade no código*
* *escalabilidade do projeto*

> #### Jest 
* *desenvolvimento guidado a testes*
* *mitigação de bugs*

> #### express, bcrypt, jsonwebtoken
* *funcionalidades modernas*


> ## Rotas do Projeto
1. **[Sign Up]**
2. **[Sign iN]**


> #### /signup - POST
* 🏆 *cadastro de usuário*
* ✔️ *verificar a procedência das informações*
* ❌ *verificar a disponibilidade de cadastro para as informções*
* ❌ *verificar a veracidade do e-mail perante os serviços de disporato*
* ❌ *confirmação do cadastro por e-mail*
* ❌ *disponibilizar acessos*
* 🐞 *status code 400 se campos obrigarórios forem omitidos ou inválidos*
* 🐞 *status code 500 e log de error se ocorrer quaisquer erros no servidor*


> #### /signin - POST
* 🏆 *autenticar informações e disponibilizar acessos*
* ✔️ *verificar a procedência das informações*
* ✔️ *retornar o token de acesso*
* 🐞 *status code 400 se campos obrigarórios forem omitidos ou inválidos*
* 🐞*HTTP status code 401 se as informações não forem autenticas*
* 🐞 *status code 500 e log de error se ocorrer quaisquer erros no servidor*
