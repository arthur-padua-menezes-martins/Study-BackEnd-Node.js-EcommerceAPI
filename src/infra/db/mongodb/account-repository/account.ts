import { IAddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { IAddAccountModel } from '../../../../domain/usecases/add-account'
import { IAccountModel } from '../../../../domain/models/account'
import { mongoHelper } from '../helper/mongo-helper'

export class AccountMongoRepository implements IAddAccountRepository {
  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    const accountCollection = await mongoHelper.getCollection('accounts')
    const resultOfAccountDataOptions = await accountCollection.insertOne(accountData)
    const accountRepository = resultOfAccountDataOptions.ops[0]
    const { _id, ...account } = accountRepository

    return await Promise.resolve(Object.assign({}, account, { id: accountRepository._id }))
  }
}
