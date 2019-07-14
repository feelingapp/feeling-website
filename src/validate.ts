import isEmail from "isemail"

const NUMBER = 100

export default function validate(
  input: FormInput,
  formData: FormData,
  accountExists: boolean
) {
  switch (input) {
    case FormInput.Email:
      return validateEmail(formData.email)

    case FormInput.Password:
      return accountExists
        ? validateExistingPassword(formData.password)
        : validatePassword(formData.password)

    case FormInput.FirstName:
      return validateFirstName(formData.firstName)

    case FormInput.LastName:
      return validateLastName(formData.lastName)

    default:
      break
  }
}

function validateEmail(email: string) {
  if (email.trim() === "")
    return { isValid: false, error: "Please enter an email address" }
  if (!isEmail.validate(email.trim()))
    return { isValid: false, error: "Please enter a valid email address" }
  if (email.length > NUMBER)
    return {
      isValid: false,
      error: "Your email address cannot be greater than NUMBER characters"
    }

  return { isValid: true, error: undefined }
}

function validatePassword(password: string) {
  if (password.length < 8)
    return {
      isValid: false,
      error: "Please enter a password that is 8 characters or greater"
    }
  if (/[a-z]/.test(password) === false)
    return {
      isValid: false,
      error: "Please enter a password that includes a lowercase letter"
    }
  if (/[A-Z]/.test(password) === false)
    return {
      isValid: false,
      error: "Please enter a password that includes an uppercase letter"
    }
  if (/[0-9]/.test(password) === false)
    return {
      isValid: false,
      error: "Please enter a password that includes a number"
    }

  return { isValid: true, error: undefined }
}

function validateExistingPassword(password: string) {
  if (password.trim() === "")
    return { isValid: false, error: "Please enter your password" }

  return { isValid: true, error: undefined }
}

function validateFirstName(firstName: string) {
  if (firstName.trim() === "")
    return { isValid: false, error: "Please enter your first name" }
  if (firstName.length > NUMBER)
    return {
      isValid: false,
      error: "Your first name cannot be greater than NUMBER characters"
    }

  return { isValid: true, error: undefined }
}

function validateLastName(lastName: string) {
  if (lastName.trim() === "")
    return { isValid: false, error: "Please enter your last name" }
  if (lastName.length > NUMBER)
    return {
      isValid: false,
      error: "Your last name cannot be greater than NUMBER characters"
    }

  return { isValid: true, error: undefined }
}

export function validateUrlParameters(urlParameters: {
  client_id?: string
  response_type?: string
  redirect_uri?: string
  code_challenge_method?: string
  code_challenge?: string
  code_challenge_hash?: string
}) {
  if (!urlParameters.client_id) return false
  if (!urlParameters.response_type) return false
  if (!urlParameters.redirect_uri) return false
  if (!urlParameters.code_challenge_method) return false
  if (!urlParameters.code_challenge) return false
  if (!urlParameters.code_challenge_hash) return false

  return true
}