export interface ICreateAccountInformationsModel {
  device: string
  browser: string
  continent?: string
  county?: string
  region?: string
  geolocation?: string
  timestamp: number
  year: number
  semester: number
  month: number
}

export interface ISignInAccountInformationsModel {
  device: string
  browser: string
  continent?: string
  county?: string
  region?: string
  geolocation?: string
  timestamp: number
  year: number
  semester: number
  month: number
}

export interface ISaveAccountInformationsModel {
  is_100_percent: boolean
  is_disabled: boolean
}

export interface IGetAccountInformationsModel {
  device: boolean
  browser: boolean
  first_access?: boolean
  last_access?: boolean
  is_100_percent?: boolean
  is_disabled?: boolean
  continent?: boolean
  county?: boolean
  region?: boolean
  year?: boolean
  semester?: boolean
  month?: boolean
}
