"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignUpHttpRequestBodyMatchField = exports.getSignUpHttpRequestBodyNotMatchField = exports.signUpHttpRequestBodyInvalidPasswordConfirmation = exports.signUpHttpRequestBodyMissingField = exports.signUpHttpRequestBodyNotMatch = exports.signUpHttpRequestBodyMatchComplete = exports.signUpHttpRequestBodyMatch = exports.signUpHttpRequestBodyAddressFields = exports.signUpHttpRequestBodyFields = void 0;
exports.signUpHttpRequestBodyFields = ['name', 'email', 'password', 'passwordConfirmation'];
exports.signUpHttpRequestBodyAddressFields = ['cep', 'street', 'number', 'neighborhood', 'city', 'state'];
const signUpHttpRequestBodyMatchData = {
    name: 'name lastName',
    email: 'arthur.software.developer@gmail.com',
    password: 'password123',
    passwordConfirmation: 'password123',
    address: {
        cep: '60741-025',
        street: 'Rua Dr. Justa Araújo',
        number: '185',
        neighborhood: 'Serrinha',
        city: 'Fortaleza',
        state: 'CE'
    }
};
exports.signUpHttpRequestBodyMatch = Object.assign({}, signUpHttpRequestBodyMatchData);
exports.signUpHttpRequestBodyMatchComplete = Object.assign({}, signUpHttpRequestBodyMatchData);
exports.signUpHttpRequestBodyNotMatch = {
    name: 'name',
    email: '$#@!%¨&*()_+[]{}`^?:;/~@',
    password: 'password',
    passwordConfirmation: 'password',
    address: {
        cep: '00000-000',
        street: 'Rua Dr. Justa Araújo',
        number: '185',
        neighborhood: 'Serrinha',
        city: 'Fortaleza',
        state: 'YZ'
    }
};
exports.signUpHttpRequestBodyMissingField = {
    email: 'arthur.software.developer@gmail.com',
    password: 'password',
    passwordConfirmation: 'password',
    address: {
        cep: '60741-025',
        street: 'Rua Dr. Justa Araújo',
        number: '185',
        neighborhood: 'Serrinha',
        city: 'Fortaleza',
        state: 'CE'
    }
};
exports.signUpHttpRequestBodyInvalidPasswordConfirmation = {
    name: 'name lastName',
    email: 'arthur.software.developer@gmail.com',
    password: 'password',
    passwordConfirmation: 'pass',
    address: {
        cep: '60741-025',
        street: 'Rua Dr. Justa Araújo',
        number: '185',
        neighborhood: 'Serrinha',
        city: 'Fortaleza',
        state: 'CE'
    }
};
exports.getSignUpHttpRequestBodyNotMatchField = (fieldName, addressFieldName) => {
    return (fieldName && addressFieldName) ? exports.signUpHttpRequestBodyNotMatch[fieldName][addressFieldName] : exports.signUpHttpRequestBodyNotMatch[fieldName];
};
exports.getSignUpHttpRequestBodyMatchField = (fieldName, addressFieldName) => {
    return (fieldName && addressFieldName) ? exports.signUpHttpRequestBodyMatch[fieldName][addressFieldName] : exports.signUpHttpRequestBodyMatch[fieldName];
};
