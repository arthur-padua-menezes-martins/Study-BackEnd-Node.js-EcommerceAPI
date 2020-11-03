/**
* @interface
* general interface for error log
* @method `logError`
* log the stack error
*/
export interface LogErrorRepository {
  logErrorStack: (stack?: string) => Promise<void>
}
