import {
  DatabaseSearchAccountByAccessToken
} from './db-read-search-account-by-access-token'
import {
  IDecrypter
} from './db-read-search-account-by-access-token-protocols'
import {
  makeDecrypterCryptography
} from './db-read-search-account-by-access-token-make'
import {
  informationsOfAccessTokenHttpRequestHeaders
} from './db-read-search-account-by-access-token-utils'

interface ISystemUnderTestTypes {
  systemUnderTest: DatabaseSearchAccountByAccessToken
  decrypterStub: IDecrypter
}
const makeSystemUnderTest = async (): Promise<ISystemUnderTestTypes> => {
  const decrypterStub = await makeDecrypterCryptography()
  const systemUnderTest = new DatabaseSearchAccountByAccessToken(decrypterStub)

  return {
    systemUnderTest,
    decrypterStub
  }
}

const accessToken = informationsOfAccessTokenHttpRequestHeaders['x-access-token']

describe('DatabaseSearchAccountByAccessToken', () => {
  test('should call Decrypter with correct values <version: 0.0.1>', async () => {
    const { systemUnderTest, decrypterStub } = await makeSystemUnderTest()

    const spyOnDecrypt = jest.spyOn(decrypterStub, 'decrypt')
    await systemUnderTest.searchByAccessToken(accessToken)

    expect(spyOnDecrypt).toHaveBeenCalledWith(accessToken)
  })
})
