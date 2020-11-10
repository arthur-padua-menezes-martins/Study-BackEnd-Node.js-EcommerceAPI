# **[ E-COMMERCE API ]**
> # TECNOLOGIAS

**TypeScript**
* *escalabilidade do projeto*

**jest**
* *desenvolvimento guidado a testes*
* *mitigação de bugs*

**express**
* *controlar requisições*

**bcrypt**
* *geração de hash*

**jsonwebtoken**
* *token de acesso*

<br/></br></br>

> # ROTAS

**/api/signup - POST**
* 🏆 *cadastro de usuário*
* ✔️ *log de erros*
* ✔️ *verificar a procedência das informações*
* ✔️ *verificar a disponibilidade de cadastro para as informções*
* ✔️ *verificar a veracidade do e-mail perante os serviços de disporato*
* ✔️ *confirmação do cadastro por e-mail*

**/api/signin - POST**
* 🏆 *autenticar informações e disponibilizar acessos*
* ✔️ *log de erros*
* ✔️ *verificar a procedência das informações*
* ✔️ *retornar o token de acesso*

**/api/survey - POST**
* 🏆 *autenticar informações e disponibilizar opções referentes à enquete*
* ✔️ *log de erros*
* ❌ *somente acesso administrativo*
* ✔️ *verificar a procedência das informações (**question** e **answers**)*
* ✔️ *criação da enquete*

<br/></br></br>

> # SUCCESS

**2xx**
* ✨ *200 ok, requisição completa e retorno das informações*
* ✨ *201 created, requisição completa e criação de um novo recurso*
* ✨ *202 accepted, requisição completa*
* ✨ *204 no content, requisição completa e nenhum retorno*

<br/></br></br>

> # ERRORS

**4xx**
* ⚠️ *400 bad request, se campos obrigarórios forem omitidos ou inválidos*
* ⚠️ *401 unauthorized, se as informações não forem autênticas*
* ⚠️ *403 forbidden, se as informações forem restritas baseadas no tipo de acesso*
* ⚠️ *404 not foud, se o conteúdo buscado não foi encontado*
* ⚠️ *422 unprocessable, se a requisição não pode ser processada*

**5xx**
* 🐞 *500 server error, se ocorrer quaisquer erros do servidor*