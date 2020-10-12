const { every } = require("../../../../helpers/function/verify.js")

/*CRYPTOGRAPHY MODULES*/
const
    crypto = require(`crypto`),

    /*HELPERS MODULES*/
    verify = require(`../../../../helpers/function/verify.js`),
    userMessages = require(`../../../../helpers/message/userMessages.js`),

    /*DATABASE MODULES*/
    mongoose = require(`mongoose`),
    Schema = mongoose.Schema,
    uniqueValidator = require(`mongoose-unique-validator`),
    mongoosePaginate = require(`mongoose-paginate`),


    usersSchema = new mongoose.Schema({

        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            index: true,
            lowercase: true,
            unique: true,
            required: true
        },

        password: {
            type: String
        },

        cpf: {
            type: String
        },

        phone: [
            {
                type: String
            }
        ],

        dateOfBirth: {
            type: Date
        },

        address: {
            street: {
                type: String
            },
            number: {
                type: String
            },
            district: {
                type: String
            },
            city: {
                type: String
            },
            state: {
                type: String
            },
            cep: {
                type: String
            }
        },

        salt: {
            type: String
        },

        recovery: {
            type: String,
        },

        hierarchy: {
            type: String,
            default: 0
        },

        excluded: {
            type: Boolean,
            default: false
        }

    }, { timestamps: true })
usersSchema.plugin(mongoosePaginate, uniqueValidator)




/*login-register-recovery*/
usersSchema.methods.passwordHash = async (password, User, Users = false) => {
    if (!Users) {
        let { salt } = User

        salt = crypto.randomBytes(16).toString(`hex`)
        User.password = verify.crypto(password, salt)

        User.save()
    }
    else {
        return verify.crypto(password, User.salt)
    }
}

usersSchema.methods.verify = async (password, User) => {
    let { salt } = User
    return verify.crypto(password, salt) === User.password ? true : false
}

usersSchema.methods.recover = async (User, recovery) => {
    User.recovery = recovery
    User.save()
}

usersSchema.methods.unsetRecover = async (User, password) => {
    const
        attributes = [User.recovery, User.password],
        values = [``, usersSchema.methods.passwordHash(password, User)]

    for (let i = 0; i < attributes.length - 1; i++) {
        attributes[i] = values[i]
    }

    User.save()
}


/*account*/
usersSchema.methods.accountDelete = async (User) => {
    const
        attributes = [User.password, User.salt, User.recovery, User.excluded],
        values = [``, ``, ``, true]

    for (let i = 0; i < attributes.length - 1; i++) {
        attributes[i] = values[i]
    }

    User.save()
}


/*session*/
usersSchema.methods.sessionStore = async (request, response) => {
    const { session, user } = request

    session.user = user

    response.cookie('@sessionID', request.sessionID, { httpOnly: true, sameSite: true })
    response.send({ authentication: { authenticated: true }, success: userMessages.LoginSuccess })
}

usersSchema.methods.sessionUpdate = async (request, response, User) => {
    let { user } = request.session

    for (const key in User) { user[key] = User[key] }

    response.send({ success: userMessages.SessionUpdateSuccess })
}

usersSchema.methods.sessionLogout = async (request, response) => {
    const { session } = request
    session.destroy(error => { response.redirect(`/login`) })
}
module.exports = mongoose.model(`users`, usersSchema)