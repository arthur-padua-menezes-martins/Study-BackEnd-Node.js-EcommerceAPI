import { MongoClient, ObjectID, Collection } from 'mongodb'
import { IAccountModel } from '../../../../domain/models/account/account'

/**
* @method `connect`
* connect to the database
* @method `isConnected`
* checks if the connection has been established
* @method `disconnect`
* disconnect to the database
* @method `getCollection`
* get a specific collection
* @method `map_id`
* adapts from _id to id
* @this `this.url`
* references database connection url
* @this `this.client`
* references a MongoClient connect
*/
export const mongoHelper = {
  client: null as unknown as MongoClient,
  url: '' as string,

  /**
  * @param url
  * database connection url
  */
  async connect (url: string): Promise<void> {
    this.url = url
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  /**
  * checks whether the database connection has been established
  */
  async isConnected (): Promise<boolean> {
    return this.client !== null
  },

  /**
  * checks whether the database connection has not established
  */
  async disconnect (): Promise<void> {
    await this.client.close()
  },

  /**
  * returns a instance of an determited Collection
  * @param name
  * the name of the collection that will be returned
  */
  async getCollection (name: string): Promise<Collection> {
    if (!(await this.isConnected())) {
      await this.connect(this.url)
    }
    return await Promise.resolve(this.client.db().collection(name))
  },

  async createObjectId (id: string) {
    return new ObjectID(id)
  },

  /**
  * returns a mapping of an object containing a _id property returning that with an id property
  * @param resultOf
  * object that will be mapped
  */
  map_id  (resultOf: any): IAccountModel {
    const { _id, ...result } = resultOf || { _id: null }

    return (_id && result) && Object.assign({}, result, { id: _id })
  }
}
