# **[ E-COMMERCE API ]**
>> # Tecnologias

> #### TypeScript
* *velocidade no código*
* *escalabilidade do projeto*

> #### Jest 
* *desenvolvimento guidado a testes*
* *mitigação de bugs*

> #### express
* *controlar requisições*

> #### bcrypt
* *hash*

> #### jsonwebtoken
* *token de acesso*



>> # Rotas
1. **[Sign Up]**
2. **[Sign iN]**

> #### /signup - POST
* 🏆 *cadastro de usuário*
* ✔️ *verificar a procedência das informações*
* ❌ *verificar a disponibilidade de cadastro para as informções*
* ❌ *verificar a veracidade do e-mail perante os serviços de disporato*
* ❌ *confirmação do cadastro por e-mail*
* ❌ *disponibilizar acessos*

> #### /signin - POST
* 🏆 *autenticar informações e disponibilizar acessos*
* ✔️ *verificar a procedência das informações*
* ✔️ *retornar o token de acesso*



>> # Erros
1. **[4xx]**
2. **[5xx]**

> #### 4xx
* 🐞 *status code 400 se campos obrigarórios forem omitidos ou inválidos*
* 🐞 *HTTP status code 401 se as informações não forem autenticas*

> #### 5xx
* 🐞 *status code 500 e log de error se ocorrer quaisquer erros do servidor*