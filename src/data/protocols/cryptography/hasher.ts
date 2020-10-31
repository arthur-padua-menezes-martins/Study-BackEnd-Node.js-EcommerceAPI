/**
* @interface
* general interface for encryption
* @method ``hash``
* strings for encrypted strings
*/
export interface IHasher {
  hash: (value: string) => Promise<string>
}
