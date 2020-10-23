import { IAddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { IAddAccountModel } from '../../../../domain/usecases/add-account'
import { IAccountModel } from '../../../../domain/models/account'
import { mongoHelper } from '../helper/mongo-helper'

export class AccountMongoRepository implements IAddAccountRepository {
  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    const accountsCollection = await mongoHelper.getCollection('accounts')
    const resultOfInsertAccountData = await accountsCollection.insertOne(accountData)
    const account = mongoHelper.Mapper_id(resultOfInsertAccountData.ops[0])

    return await Promise.resolve(account)
  }
}
