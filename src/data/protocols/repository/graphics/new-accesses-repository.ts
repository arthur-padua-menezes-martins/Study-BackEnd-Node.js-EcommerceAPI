import { INewAccessesModel } from '../../../../domain/models/graphics/new-accesses'
import { ISaveNewAccessesModel, IGetNewAccessesModel } from '../../../../domain/usecases/graphics/new-accesses'

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
