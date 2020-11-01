# ***ecommerce_sertao_nerd***



### ***rotas***

✨ */signup* **POST**
1. ✔️ receber informações de cadastro e realiza-lo
1. ✔️ verificar a validade das informações
1. ❌ verificar se o e-mail já foi cadastrado
1. ❌ verificar se o e-mail é valido para os serviços de disparo de e-mail
1. ❌ confirmar a criação da conta utlizando de hash enviado por e-mail
1. ❌ retornar o token de acesso

2. retorna *HTTP status code 400* se qualquer campo obrigarório for omitido ou inválido
2. retorna *HTTP status code 500* se ocorrer qualquer erro no servidor




✨ */signin* **POST**

1. ✔️ receber informações de login e autentica-las
1. ✔️ verificar a validade das informações
1. ✔️ autenticar informações
1. ✔️ retornar o token de acesso

2. retorna *HTTP status code 400* se qualquer campo obrigarório for omitido ou inválido
2. retorna *HTTP status code 401* se as informações não forem autenticadas corretamente
2. retorna *HTTP status code 500* se ocorrer qualquer erro no servidor
