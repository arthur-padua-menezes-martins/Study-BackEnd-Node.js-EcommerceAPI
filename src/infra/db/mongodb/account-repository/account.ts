import { IAddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { IAddAccountModel } from '../../../../domain/usecases/add-account'
import { IAccountModel } from '../../../../domain/models/account'
import { mongoHelper } from '../helper/mongo-helper'

export class AccountMongoRepository implements IAddAccountRepository {
  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    const accountCollection = await mongoHelper.getCollection('accounts')
    const resultOfAccountDataOptions = await accountCollection.insertOne(accountData)
    const account = mongoHelper.Mapper_id(resultOfAccountDataOptions.ops[0])

    return await Promise.resolve(account)
  }
}
