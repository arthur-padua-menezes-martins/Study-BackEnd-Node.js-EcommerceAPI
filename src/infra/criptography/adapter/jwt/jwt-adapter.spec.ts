import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'
import { accountModelMatch } from '../../../../utils/fake-data/accountModel'

const anyToken = 'any_token'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await Promise.resolve(anyToken)
  }
}))

describe('JWT', () => {
  test('Should call sign with correct values', async () => {
    const sut = new JwtAdapter('secret')
    const sypOnSign = jest.spyOn(jwt, 'sign')

    await sut.encrypt(accountModelMatch.id)
    expect(sypOnSign).toHaveBeenCalledWith({ id: accountModelMatch.id }, 'secret')
  })

  test('Should call sign with correct values', async () => {
    const sut = new JwtAdapter('secret')

    const accessToken = await sut.encrypt(accountModelMatch.id)
    expect(accessToken).toBe(anyToken)
  })
})
