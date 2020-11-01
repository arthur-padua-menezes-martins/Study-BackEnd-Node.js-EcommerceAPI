# ***ecommerce_sertao_nerd***




✨ /signup - POST
✔️ receber informações de cadastro e realiza-lo
✔️ verificar a validade das informações
❌ verificar se o e-mail já foi cadastrado
❌ verificar se o e-mail é valido para os serviços de disparo de e-mail
❌ confirmar a criação da conta utlizando de hash enviado por e-mail
❌ retornar o token de acesso

retorna HTTP status code 400 se qualquer campo obrigarório for omitido ou inválido
retorna HTTP status code 500se ocorrer qualquer erro no servidor




✨ /signin - POST

✔️ receber informações de login e autentica-las
✔️ verificar a validade das informações
✔️ autenticar informações
✔️ retornar o token de acesso

retorna HTTP status code 400 se qualquer campo obrigarório for omitido ou inválido
retorna HTTP status code 401 se as informações não forem autenticadas corretamente
retorna HTTP status code 500<> se ocorrer qualquer erro no servidor
