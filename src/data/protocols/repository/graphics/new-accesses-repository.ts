import {
  INewAccessesModel,
  ISaveNewAccessesModel, IGetNewAccessesModel
} from './import-all'

/**
* @interface
* specific interface to manage access-related data storage and retrieval
* @method `save`
* register new access
* @method `get`
* retrieve information about accesses
*/
export interface INewAccessesRepository {
  save: (newAccessesData: ISaveNewAccessesModel) => void
  get: (searchInformation: IGetNewAccessesModel) => Promise<INewAccessesModel>
}
