/*DATABASE MODULES*/
const
    products = require(`../../models/database/MongoDB/Schema/products.js`),
    variations = require(`../../models/database/MongoDB/Schema/variations.js`),
    requests = require(`../../models/database/MongoDB/Schema/requests.js`),
    recordsRequests = require(`../../models/database/MongoDB/Schema/recordsRequests.js`),
    payments = require(`../../models/database/MongoDB/Schema/payments.js`),

    /*HELPERS MODULES*/
    constructors = require(`../../helpers/function/constructors.js`),
    setErrorStatus = require(`../../helpers/error/setErrorStatus.js`),

    /*INTEGRATIONS MODULES*/
    { startPayment, getSessionId, getTransactionStatus, getNotification } = require(`../integrations/pagseguro/index.js`)


class paymentsController {

    async view(request, response, next) {
        try {

            const { params } = request, error = new Error()
            let Payments = await payments.findOne({ _id: params._id })

            if (Payments) {

                let RecordsRequests = await recordsRequests.find({ requests: Payments.requests, type: `payment` })
                const TransactionStatus = Payments.pagSeguroCode ? await getTransactionStatus(Payments.pagSeguroCode) : null

                if (TransactionStatus && (RecordsRequests.length == 0 || !RecordsRequests[RecordsRequests.length - 1].payload || !RecordsRequests[RecordsRequests.length - 1].payload.code || RecordsRequests[RecordsRequests.length - 1].payload.code != TransactionStatus.code)) {
                    let newRecordsRequests = await new recordsRequests(await constructors.objectConstructor({ type: `payment`, situation: TransactionStatus.status, payload: TransactionStatus, requests: Payments.requests }))

                    Payments.status = TransactionStatus.status
                    await newRecordsRequests.save()
                    await Payments.save()

                    RecordsRequests.push(newRecordsRequests)
                }

                response.send({ Payments, TransactionStatus, RecordsRequests })

            }
            else {
                setErrorStatus.error400(error, next)
            }

        } catch (error) { console.error(error) }
    }




    async pay(request, response, next) {
        try {

            const { body, params } = request, { senderHash } = body
            let Payments = await payments.findOne({ _id: params._id })

            if (Payments) {
                let Requests = await requests.findById(Payments.requests).populate([{ path: `users` }, `deliveries`, `payments`])

                Requests.cart = await Promise.all(
                    Requests.cart.map(async iterator => {
                        iterator.products = await products.findById(iterator.products)
                        iterator.variations = await variations.findById(iterator.variations)
                        return iterator
                    })
                )

                const paymentFormalization = await startPayment(senderHash, Requests)
                Payments.pagSeguroCode = paymentFormalization.code ? paymentFormalization.code : Payments.pagSeguroCode
                Payments.payload = Payments.payload ? Payments.payload.concat(paymentFormalization) : [paymentFormalization]

                await Payments.save()

                response.send({ Payments, paymentFormalization })
            }
            else {
                setErrorStatus.error400(error, next)
            }

        } catch (error) { console.error(error) }
    }




    async showSessionId(request, response, next) {
        try {

            const sessionId = await getSessionId(), error = new Error()
            sessionId ? response.send({ sessionId }) : setErrorStatus.error401(error, next)

        } catch (error) { console.error(error) }
    }




    async showNotifications() {
        try {

            const { body } = request, { notificationCode, notificationType } = body

            if (notificationType == `transaction`) {
                let Payments = await payments.findOne({ pagSeguroCode: (await getNotification(notificationCode)).code })
                if (Payments) {
                    let RecordsRequests = await recordsRequests.find({ requests: Payments.requests })
                    const TransactionStatus = Payments.pagSeguroCode ? await getTransactionStatus(Payments.pagSeguroCode) : null

                    if (TransactionStatus && (RecordsRequests.length == 0 || !RecordsRequests[RecordsRequests.length - 1].payload || !RecordsRequests[RecordsRequests.length - 1].payload.code || RecordsRequests[RecordsRequests.length - 1].payload.code != TransactionStatus.code)) {
                        newRecordsRequests = await new recordsRequests(await constructors.objectConstructor({ type: `pay`, situation: TransactionStatus.status, payload: TransactionStatus, requests: Payments.requests }))
                        Payments.status = TransactionStatus.status

                        await newRecordsRequests.save()
                        await Payments.save()

                        response.send({ success: true })
                    }
                    else {
                        setErrorStatus.error400(error, next)
                    }
                }
                else {
                    setErrorStatus.error400(error, next)
                }
            }
            else {
                response.send({ success: true })
            }

        } catch (error) { console.error(error) }
    }

}
module.exports = paymentsController