import {
  IMostAccessedPagesModel,
  ISaveMostAccessedPagesModel, IGetMostAccessedPagesModel
} from './import-all'

/**
* @interface
* specific interface to manage the storage and retrieval of data related to specific pages access
* @method `save`
* register new access
* @method `get`
* retrieve information about pages accesses
*/
export interface IMostAccessedPagesRepository {
  save: (newPageAccessData: ISaveMostAccessedPagesModel) => void
  get: (searchInformation: IGetMostAccessedPagesModel) => Promise<IMostAccessedPagesModel>
}
