/**
* @interface
* general interface for hashing
* @method ``hash``
* transform strings for hashing strings
*/
export interface IHasher {
  /**
  * @param value
  * value to transform into a hash string
  */
  hash: (value: string) => Promise<string>
}
