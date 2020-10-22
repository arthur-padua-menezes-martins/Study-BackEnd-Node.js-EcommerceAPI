import { MongoClient, Collection } from 'mongodb'

export const mongoHelper = {
  client: null as unknown as MongoClient,

  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  async getCollection (name: string): Promise<Collection> {
    return await Promise.resolve(this.client.db().collection(name))
  }
}
