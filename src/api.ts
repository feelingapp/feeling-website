import queryString from "query-string"

export interface SignInBody extends UrlParameters {
  email: string
  password: string
}

export interface RegisterBody extends SignInBody {
  firstName: string
  lastName: string
}

export async function register(body: RegisterBody) {
  const response = await fetch(`${process.env.API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })

  return response
}

export async function signIn(body: SignInBody) {
  const response = await fetch(`${process.env.API_URL}/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })

  return response
}

export async function checkAccountExists(email: string) {
  const urlParameters = queryString.stringify({ email })

  const response = await fetch(
    `${process.env.API_URL}/user/exists?${urlParameters}`
  )
  const { exists, first_name: firstName } = await response.json()

  return { exists, firstName }
}
