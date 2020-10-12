const
    userMessages = require(`../../../helpers/message/userMessages.js`),
    PagSeguroConfig = require(`../../../config/pagseguro/pagseguro.js`),
    PagSeguro = require(`../../../helpers/pagseguro/pagseguro.js`)


const startPaymentWithBoleto = async (senderHash, { users, cart, deliveries, payments }) => {

    return new Promise((resolve, reject) => {

        const pagSeguro = new PagSeguro(PagSeguroConfig)

        pagSeguro.setSender({
            name: users.name,
            email: users.email,
            cpf_cnpj: users.cpf.replace(/[-\.]/g, ``),
            area_code: users.phone[0].slice(0, 2),
            phone: users.phone[0].slice(2).trim(),
            birth_date: users.dateOfBirth
        })

        pagSeguro.setShipping({
            street: deliveries.address.street,
            number: deliveries.address.number,
            district: deliveries.address.district,
            city: deliveries.address.city,
            state: deliveries.address.state,
            postal_code: deliveries.address.cep.replace(/-/g, ``),
            same_for_billing: payments.deliveryAddressBillingAddress
        })

        pagSeguro.setBilling({
            street: payments.address.street,
            number: payments.address.number,
            district: payments.address.district,
            city: payments.address.city,
            state: payments.address.state,
            postal_code: payments.address.cep.replace(/-/g, ``)
        })

        cart.forEach(iterator => {
            pagSeguro.addItem({
                qtde: iterator.quantity,
                value: iterator.unitaryValue,
                description: `${iterator.variations.title} - ${iterator.products.reference}`,
            })
        })

        pagSeguro.addItem({
            qtde: 1,
            value: deliveries.value,
            description: `Custo de Entrega - Correios`,
        })

        pagSeguro.sendTransaction({
            method: `boleto`,
            value: payments.value,
            installments: 1,
            hash: senderHash
        }, (error, paymentsData) => error ? reject(error) : resolve(paymentsData))

    })

}


const startCardPayment = async (senderHash, { users, cart, deliveries, payments }) => {

    return new Promise((resolve, reject) => {

        const pagSeguro = new PagSeguro(PagSeguroConfig)

        pagSeguro.setSender({
            name: users.name,
            email: users.email,
            cpf_cnpj: users.cpf.replace(/[-\.]/g, ``),
            area_code: users.phone[0].slice(0, 2),
            phone: users.phone[0].slice(2).trim(),
            birth_date: users.dateOfBirth
        })

        pagSeguro.setShipping({
            street: deliveries.address.street,
            number: deliveries.address.number,
            district: deliveries.address.district,
            city: deliveries.address.city,
            state: deliveries.address.state,
            postal_code: deliveries.address.cep.replace(/-/g, ``),
            same_for_billing: payments.deliveryAddressBillingAddress
        })

        pagSeguro.setBilling({
            street: payments.address.street,
            number: payments.address.number,
            district: payments.address.district,
            city: payments.address.city,
            state: payments.address.state,
            postal_code: payments.address.cep.replace(/-/g, ``)
        })

        cart.forEach(iterator => {
            pagSeguro.addItem({
                qtde: iterator.quantity,
                value: iterator.unitaryValue,
                description: `${iterator.variations.title} - ${iterator.products.reference}`,
            })
        })

        pagSeguro.addItem({
            qtde: 1,
            value: deliveries.value,
            description: `Custo de Entrega - Correios`,
        })

        pagSeguro.setCreditCardHolder({
            name: payments.card.name || users.name,
            cpf_cnpj: (payments.card.cpf || users.cpf).replace(/[-\.]/g, ``),
            area_code: payments.card.areaCode.trim() || users.phone[0].slice(0, 2),
            phone: payments.card.phone.trim() || users.phone[0].slice(2),
            birth_date: payments.card.dateOfBirth || users.dateOfBirth,
        })

        pagSeguro.sendTransaction({
            method: `creditCard`,
            value: payments.value % 2 != 0 && payments.installment > 1 ? Number((payments.value + 0.01).toFixed(2)) : payments.value,
            installments: payments.installment,
            hash: senderHash,
            credit_card_token: payments.card.token
        }, (error, paymentsData) => error ? reject(error) : resolve(paymentsData))

    })

}


const startPayment = async (senderHash, Requests) => {
    try {

        switch (Requests.payments.paymentMethod) {
            case `boleto`:
                return await startPaymentWithBoleto(senderHash, Requests)
                break

            case `creditCard`:
                return await startCardPayment(senderHash, Requests)
                break

            default:
                return { errors: userMessages.paymentsError[1] }
        }

    } catch (error) { console.error(error); return { errors: userMessages.PaymentsError[0] } }
}


const getSessionId = () => {
    try {

        return new Promise((resolve, reject) => {
            const pagSeguro = new PagSeguro(PagSeguroConfig)
            return pagSeguro.sessionId((error, sessionId) => error ? reject(error) : resolve(sessionId))
        })

    } catch (error) { console.error(error) }
}


const getTransactionStatus = (pagSeguroCode) => {
    try {

        return new Promise((resolve, reject) => {
            const pagSeguro = new PagSeguro(PagSeguroConfig)
            pagSeguro.transactionStatus(pagSeguroCode, (error, result) => error ? reject(error) : resolve(result))
        })

    } catch (error) { console.error(error) }
}


const getNotification = (notificationCode) => {
    try {

        return new Promise((resolve, reject) => {
            const pagSeguro = new PagSeguro(PagSeguroConfig)
            pagSeguro.getNotification(notificationCode, (error, result) => error ? reject(error) : resolve(result))
        })

    } catch (error) { console.error(error) }
}


module.exports = { startPayment, getSessionId, getTransactionStatus, getNotification }