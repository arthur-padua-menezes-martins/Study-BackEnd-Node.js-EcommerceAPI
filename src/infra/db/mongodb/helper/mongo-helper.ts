import { MongoClient, Collection } from 'mongodb'
import { IAccountModel } from '../../../../domain/models/account'

export const mongoHelper = {
  client: null as unknown as MongoClient,
  url: '' as string,

  async connect (url: string): Promise<void> {
    this.url = url
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async isConnected (): Promise<boolean> {
    return this.client !== null
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  async getCollection (name: string): Promise<Collection> {
    if (!(await this.isConnected())) {
      await this.connect(this.url)
    }
    return await Promise.resolve(this.client.db().collection(name))
  },

  Mapper_id  (resultOf: any): IAccountModel {
    const { _id, ...result } = resultOf

    return Object.assign({}, result, { id: _id })
  }
}
