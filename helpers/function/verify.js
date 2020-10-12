const crypto = require(`crypto`)

module.exports = {

    crypto: (password, salt) => {

        return crypto.pbkdf2Sync(password, salt, 8, 256, `sha512`).toString(`hex`)

    },

    notNull: value => {

        if (Boolean(value) && Boolean(value[0]))
            return true
        else
            return false

    },

    every: (array, not = false) => {

        if (not)
            return !array.every((iterator) => { return Boolean(iterator) })
        else
            return array.every((iterator) => { return Boolean(iterator) })
            
    }

}