export interface Ecounter {
  id: number
  name: string
  indication: number
  pay: number
  lastdate: Date
  "phone": string
  lastdiffer: number
}

export interface CounterInfo {
  "id"?: number,
  "ownerId": number,
  "indication": number,
  "edate": Date,
  "pay": number
}

export interface FbCreateResponse {
  name: string
}

export interface Infos {
  energycost: number;
  rentcost: number;
  internet: number;
}

export interface AuthResponse {
  token: string
  expiresIn: string
}
