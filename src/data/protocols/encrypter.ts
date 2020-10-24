/**
* @interface
* general interface for encryption
* @method ``encrypt``
* strings for encrypted strings
*/
export interface IEncrypter {
  encrypt: (value: string) => Promise<string>
}
