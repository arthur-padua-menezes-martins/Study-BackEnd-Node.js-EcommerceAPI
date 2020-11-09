import {
  SuperClassSignInAndSignUpController
} from './super-class-sign-in-and-sign-up-controller'

describe('superClassSignInAndSignUpController', () => {
  test('', () => {
    const systemUnderTest = new SuperClassSignInAndSignUpController()

    expect(systemUnderTest.generateTypes).toBe(true)
  })
})
