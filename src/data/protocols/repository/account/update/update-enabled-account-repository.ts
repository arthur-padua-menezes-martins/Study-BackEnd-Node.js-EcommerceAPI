/**
* @interface
* specific interface to update the enabled field
* @method `add`
* update the status of the enabled field for a given account
*/
export interface IUpdateEnabledAccountRepository {
  /**
  * @param id
  * id to search an account
  * @param status
  * status to update the enabled field
  */
  updateEnabled: (id: string, status: boolean) => Promise<void>
}
