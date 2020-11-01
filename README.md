# ***ecommerce_sertao_nerd***
<br>
</br>
</br>
✨ /signup - POST</br>
✔️ receber informações de cadastro e realiza-lo</br>
✔️ verificar a validade das informações</br>
❌ verificar se o e-mail já foi cadastrado</br>
❌ verificar se o e-mail é valido para os serviços de disparo de e-mail</br>
❌ confirmar a criação da conta utlizando de hash enviado por e-mail</br>
❌ retornar o token de acesso</br>
</br>
retorna <strong>HTTP status code 400</strong> se qalquer campo obrigarório for omitido</br>
retorna <strong>HTTP status code 500</strong> se ocorrer qualquer erro no servidor</br>
<br>
</br>
</br>
✨ /signin - POST</br>
✔️ receber informações de login e autentica-las</br>
✔️ verificar a validade das informações</br>
✔️ autenticar informações</br>
✔️ retornar o token de acesso</br>
</br>
retorna <strong>HTTP status code 401</strong> se as informações não forem autenticadas corretamente</br>
retorna <strong>HTTP status code 500</strong> se ocorrer qualquer erro no servidor</br>
