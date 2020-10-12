class errorsController {

    errorHandling(error, request, response, next) {
        const { httpStatusCode } = error

        if (httpStatusCode == 400)
            response.status(httpStatusCode).send(`bad request`)

        if (httpStatusCode == 401)
            response.status(httpStatusCode).send(`missing authorization`)

        if (httpStatusCode == 404)
            response.status(httpStatusCode).send(`page not found`)

        if (httpStatusCode == 422)
            response.status(httpStatusCode).send(`unworkable`)
    }

}
module.exports = errorsController