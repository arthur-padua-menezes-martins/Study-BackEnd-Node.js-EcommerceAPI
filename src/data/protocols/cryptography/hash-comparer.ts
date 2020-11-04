/**
* @interface
* general interface to compare values with hashes
* @method ``compare``
* strings for encrypted strings
*/
export interface IHashComparer {
  /**
  * @param value
  * value to compare
  * @param hash
  * hash to compare
  */
  compare: (value: string, hash: string) => Promise<boolean>
}
