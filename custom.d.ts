declare module "*.svg" {
  const content: string
  export default content
}

export interface UrlParameters {
  clientId: string
  responseType: string
  redirectUri: string
  codeChallengeMethod: string
  codeChallenge: string
}

export enum FormInput {
  Email = 0,
  Password = 1,
  FirstName = 2,
  LastName = 3
}

export interface FormData {
  email: string
  password: string
  firstName: string
  lastName: string
}
