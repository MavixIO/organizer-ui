export interface GetSchool {
  id: string
  name: string
  abbreviation: string
  address: string
  logo: string
  hasUsers: boolean
}

export interface GetOrganisation {
  id: string
  name: string
  address: string
  logo: string
  hasUsers: boolean
}

export interface User {
  email: string
  firstname: string
  lastname: string
  displayName: string
  phone: string
}

export interface School {
  name: string
  abbreviation: string
  address: string
  logoFile: string
}

export interface Organization {
  name: string
  address: string
  logoFile: string
}
