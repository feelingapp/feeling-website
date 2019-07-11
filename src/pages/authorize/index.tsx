import React, { useEffect, useRef, useState } from "react"
import styled, { css } from "styled-components"
import queryString from "query-string"

import { Layout, Nav, Seo, Loading } from "../../components"
import {
  checkAccountExists,
  signIn,
  register,
  SignInBody,
  RegisterBody
} from "./api"
import validate, { validateUrlParameters } from "./validate"
import { FormData, FormInput } from "./types"
import backIcon from "../../images/back-icon.svg"

interface MainProps {
  currentInput: number
}

const Main = styled.main<MainProps>`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: background-color 100ms;

  ${({ currentInput }) => {
    if (currentInput === 0)
      return css`
        background-color: #caeaf8;
      `

    if (currentInput === 1)
      return css`
        background-color: #e4d0f2;
      `

    if (currentInput === 2)
      return css`
        background-color: #f8edca;
      `

    if (currentInput === 3)
      return css`
        background-color: #cef8ca;
      `
  }};
`

interface ProgressBarProps {
  progress: string
}

const ProgressBar = styled.div<ProgressBarProps>`
  align-self: flex-start;
  background-color: #fefefe;
  transition: width 100ms ease-out;
  height: 8px;
  width: ${({ progress }) => progress};
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  font-family: "Roboto";
  font-weight: 500;
  color: #1b1b1b;
  width: 100%;
  flex: 1;
  padding: 0 20px 20px;
`

const InputContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 1.6rem;
`

const Input = styled.input`
  border: none;
  background-color: inherit;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  font-weight: inherit;
  margin-bottom: 16px;
  outline: none;

  ::placeholder {
    color: inherit;
  }
`

const Error = styled.p`
  font-size: 1.6rem;
  font-weight: normal;
  color: #b70808;
`

const Button = styled.div`
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  text-align: center;
  color: inherit;
  padding: 16px;
  border-radius: 12px;
  background-color: rgba(254, 254, 254, 0.8);
  box-shadow: 0 1px 20px rgba(0, 0, 0, 0.1);
  transition: transform 100ms ease-out;

  &:active {
    transform: scale(0.95);
  }
`

function Authorize() {
  const urlParameters = queryString.parse(window.location.search)

  // Go back to the last page if the right url parameters are not supplied
  if (!validateUrlParameters(urlParameters)) {
    window.history.back()
  }

  const [isLoading, setIsLoading] = useState(false)
  const [account, setAccount] = useState({
    exists: undefined,
    firstName: undefined
  })
  const [currentInput, setCurrentInput] = useState(FormInput.Email)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  })

  const emailRef = useRef()
  const passwordRef = useRef()
  const firstNameRef = useRef()
  const lastNameRef = useRef()

  useEffect(() => {
    switch (currentInput) {
      case FormInput.Email:
        if (emailRef.current) emailRef.current.focus()
        break
      case FormInput.Password:
        if (passwordRef.current) passwordRef.current.focus()
        break
      case FormInput.FirstName:
        if (firstNameRef.current) firstNameRef.current.focus()
        break
      default:
        break
    }
  }, [currentInput, emailRef, passwordRef, firstNameRef])

  function handleNavBackClick() {
    // Reset has account since the user is going back to edit the email
    if (currentInput === FormInput.Password)
      setAccount({ exists: undefined, firstName: undefined })

    if (currentInput === FormInput.Email) window.history.back()
    else setCurrentInput(currentInput - 1)

    setErrorMessage(undefined)
  }

  async function handleButtonClick() {
    // Check current input is valid
    const { isValid, error } = validate(currentInput, formData, account.exists)

    // Show error message if input is not valid
    if (!isValid) {
      setErrorMessage(error)
      return
    }

    // After inputting an email, check if an account already exists
    if (currentInput === FormInput.Email) {
      setIsLoading(true)

      try {
        const account = await checkAccountExists(formData.email)
        await setAccount(account)
      } catch (error) {
        setErrorMessage(
          "We can't connect to the server, please try again later"
        )
        return
      } finally {
        await setIsLoading(false)
      }
    }

    // If the user already has an account, submit the form after they enter their password
    if (account.exists && currentInput === FormInput.Password) {
      setIsLoading(true)
      await submitForm(formData, account.exists)
      await setIsLoading(false)
    }

    // The user doesn't have an account, so wait till they finish the whole form to submit
    if (currentInput === FormInput.LastName) {
      setIsLoading(true)
      await submitForm(formData, account.exists)
      await setIsLoading(false)
    } else setCurrentInput(currentInput + 1)

    // Clear the error message
    setErrorMessage(undefined)
  }

  async function submitForm(formData: FormData, accountExists: boolean) {
    const urlParameters = queryString.parse(window.location.search)

    try {
      const response = accountExists
        ? await signIn({ ...urlParameters, ...formData } as SignInBody)
        : await register({ ...urlParameters, ...formData } as RegisterBody)

      const { authorization_code } = await response.json()
      const redirectUrlParameters = queryString.stringify({
        authorization_code
      })
      window.location.href = `${urlParameters.redirect_uri}?${redirectUrlParameters}`
    } catch (error) {
      setErrorMessage("We can't connect to the server, please try again later")
    }
  }

  return (
    <Layout>
      <Seo title="Sign In" />

      <Loading show={isLoading} />

      <Main currentInput={currentInput}>
        <ProgressBar
          progress={`${(currentInput + 1) * (account.exists ? 50 : 25)}%`}
        />

        <Nav
          title={
            account.exists === undefined
              ? ""
              : account.exists
              ? `Welcome Back, ${account.firstName}!`
              : "Create an Account"
          }
          leftIcon={{
            src: backIcon,
            alt: "back",
            onClick: handleNavBackClick
          }}
        />

        <Form>
          <InputContainer>
            {currentInput === FormInput.Email && (
              <Input
                ref={emailRef}
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={event =>
                  setFormData({ ...formData, email: event.target.value })
                }
              />
            )}

            {currentInput === FormInput.Password && (
              <Input
                ref={passwordRef}
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={event =>
                  setFormData({ ...formData, password: event.target.value })
                }
              />
            )}

            {currentInput === FormInput.FirstName && (
              <Input
                ref={firstNameRef}
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={event =>
                  setFormData({ ...formData, firstName: event.target.value })
                }
              />
            )}

            {currentInput === FormInput.LastName && (
              <Input
                ref={lastNameRef}
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={event =>
                  setFormData({ ...formData, lastName: event.target.value })
                }
              />
            )}

            <Error>{errorMessage}&nbsp;</Error>
          </InputContainer>

          <Button onClick={handleButtonClick}>
            {currentInput === FormInput.LastName ||
            (currentInput === FormInput.Password && account.exists)
              ? "Finish"
              : "Next"}
          </Button>
        </Form>
      </Main>
    </Layout>
  )
}

export default Authorize
