/**
* @interface
* general interface for encryption
* @method ``encrypt``
* transform strings for encrypted strings
*/
export interface IEncrypter {
  /**
  * @param value
  * value to encrypt
  */
  encrypt: (value: string) => Promise<string>
}
