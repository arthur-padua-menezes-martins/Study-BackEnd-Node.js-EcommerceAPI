Object.filter = function (object = Object(), hasThisProperty = String(), realizeThisFunction) {

    let result

    for (const keys in object) {
        if (object.hasOwnProperty(hasThisProperty)) {
            object.hasThisProperty = realizeThisFunction(object.hasThisProperty)
        }
    }

    return result

}