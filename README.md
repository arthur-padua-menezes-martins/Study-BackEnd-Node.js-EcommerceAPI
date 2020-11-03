# **[ E-COMMERCE API ]**
> # TECNOLOGIAS

**TypeScript**
* *velocidade no código*
* *escalabilidade do projeto*

**jest**
* *desenvolvimento guidado a testes*
* *mitigação de bugs*

**express**
* *controlar requisições*

**bcrypt**
* *hash*

**jsonwebtoken**
* *token de acesso*

<br/></br></br>

> # ROTAS

**/signup - POST**
* 🏆 *cadastro de usuário*
* ✔️ *log de erros*
* ✔️ *verificar a procedência das informações*
* ✔️ *verificar a disponibilidade de cadastro para as informções*
* ✔️ *verificar a veracidade do e-mail perante os serviços de disporato*
* ✔️ *confirmação do cadastro por e-mail*

**/signin - POST**
* 🏆 *autenticar informações e disponibilizar acessos*
* ✔️ *log de erros*
* ✔️ *verificar a procedência das informações*
* ✔️ *retornar o token de acesso*

<br/></br></br>

> # ERRORS

**4xx**
* 🐞 *400 bad request, se campos obrigarórios forem omitidos ou inválidos*
* 🐞 *401 unauthorized, se as informações não forem autênticas*
* 🐞 *422 unprocessable, se a requisição não pode ser processada*

**5xx**
* 🐞 *500 server error, se ocorrer quaisquer erros do servidor*