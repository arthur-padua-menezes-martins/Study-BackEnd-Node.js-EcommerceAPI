import { MongoClient, Collection } from 'mongodb'
import { IAccountModel } from '../../../../domain/models/account'

/**
* @method `connect`
* connect to the database
* @method `isConnected`
* checks if the connection has been established
* @method `disconnect`
* disconnect to the database
* @method `getCollection`
* get a specific collection
* @method `mapper_id`
* adapts from _id to id
*/
export const mongoHelper = {
  client: null as unknown as MongoClient,
  url: '' as string,

  /**
  * @param url
  * database connection url
  * @this `this.url`
  * references database connection url
  * @this `this.client`
  * references a MongoClient connect
  */
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

  mapper_id  (resultOf: any): IAccountModel {
    const { _id, ...result } = resultOf

    return Object.assign({}, result, { id: _id })
  }
}
