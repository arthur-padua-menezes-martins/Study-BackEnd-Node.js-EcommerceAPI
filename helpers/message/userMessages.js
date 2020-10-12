module.exports =
{
    LoginError : `autenticação inválida`,
    LoginSuccess : `autenticação realizada`,

    RegisterError : `não foi possivel gerar uma autenticação válida, por favor preencha todos os campos verificando a validade das informações!`,
    RegisterSuccess : `informações registradas!`,

    RecoveryError : 
    [
        `e-mail inválido para a recuperação de senha, informe um e-mail destinado à essa função`, 
        `verifique a validade das informações`, 
        `o período para redefinição expirou, solicite um novo` 
    ],
    RecoveryWarning : `você possui 48 horas para definir uma nova senha`,
    RecoverySuccess : `senha alterada!`,

    SessionUpdateSuccess : `informações atualizadas`,

    RequestsError : 
    [
        `quantidade em estoque indisponível`
    ],

    PaymentsError :
    [
        `ocorreu um erro ao iniciar o pagamento`,
        `forma de pagamento não encontada`
    ],

    EmailValidatorError : `e-mail inválido`,
}