/**
* @interface
* general interface for decryption
* @method ``decrypt``
* transform encrypted strings for strings
*/
export interface IDecrypter {
  /**
  * @param value
  * value to decrypt
  */
  decrypt: (value: string) => Promise<string>
}
