import mongoose, { Mongoose, Collection } from 'mongoose'

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
* references a MongooseClient connect
*/
export const MongoHelper = {
  client: null as unknown as Mongoose,
  url: '' as string,

  /**
  * @param url
  * database connection url
  */
  async connect (url: string): Promise<void> {
    this.url = url
    this.client = await mongoose.connect(url, {
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
    await this.client.connection.close()
  },

  /**
  * returns a instance of an determited Collection
  * @param name
  * the name of the collection that will be returned
  */
  async getCollection (name: string, options?: any): Promise<Collection> {
    if (!(await this.isConnected())) {
      await this.connect(this.url)
    }

    return this.client.connection.collection(name, options)
  },

  async createObjectId (id: string) {
    return this.client.Types.ObjectId(id)
  },

  /**
  * returns a mapping of an object containing a _id property returning that with an id property
  * @param resultOf
  * object that will be mapped
  */
  map_id  (resultOf: any): any {
    const { _id, ...result } = resultOf || { _id: null }

    return (_id && result) && Object.assign({}, result, { id: _id })
  }
}
