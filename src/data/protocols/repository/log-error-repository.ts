/**
* @interface
* general interface for error log
* @method `logError`
* log the stack error
*/
export interface LogErrorRepository {
  logError: (stack?: string) => Promise<void>
}
