export interface ISaveMostAccessedPagesModel {
  id: number
  uniqid: number
  user_id?: number
  path: string
  device: string
  timestamp: number
  year: number
  semester: number
  month: number
  week?: number
  day?: number
}

export interface IGetMostAccessedPagesModel {
  path?: boolean
  device?: boolean
  timestamp?: boolean
  year?: boolean
  semester?: boolean
  month?: boolean
  week?: boolean
  day?: boolean
}
