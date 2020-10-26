export interface ISaveNewAccessesModel {
  id: number
  uniqid: number
  user_id?: number
  device: string
  timestamp: number
  year: number
  semester: number
  month: number
  week: number
  day: number
}

export interface IGetNewAccessesModel {
  id?: boolean
  uniqid?: boolean
  user_id?: boolean
  device?: boolean
  timestamp?: boolean
  year?: boolean
  semester?: boolean
  month?: boolean
  week?: boolean
  day?: boolean
}
