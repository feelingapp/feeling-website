import React, { useEffect, useRef, useState } from "react"
import styled, { css } from "styled-components"
import queryString from "query-string"

import Layout from "../components/Layout"
import Seo from "../components/Seo"
import backIcon from "../images/back-icon.svg"

const Main = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: background-color 100ms;

  ${({ input }) => {
    if (input === 0)
      return css`
        background-color: #caeaf8;
      `

    if (input === 1)
      return css`
        background-color: #e4d0f2;
      `

    if (input === 2)
      return css`
        background-color: #f8edca;
      `

    if (input === 3)
      return css`
        background-color: #cef8ca;
      `
  }};
`

const ProgressBar = styled.div`
  align-self: flex-start;
  background-color: #fefefe;
  transition: width 100ms ease-out;
  height: 8px;
  width: ${({ progress }) => progress};
`

const Nav = styled.nav`
  height: 56px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 4px;
`

const NavIcon = styled.img`
  height: 48px;
  width: 48px;
  padding: 12px;
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
  padding: 20px;
`

const InputContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Input = styled.input`
  border: none;
  background-color: inherit;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  font-weight: inherit;
  margin-bottom: 24px;
  flex: 1;
  outline: none;

  ::placeholder {
    color: inherit;
  }
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

async function submitForm(formData) {
  const urlParameters = queryString.parse(window.location.search)

  const response = fetch(`${process.env.API_URL}/authorize`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...urlParameters,
      ...formData
    })
  })

  const { authorization_code } = response.json()
  const redirectUrlParams = queryString.stringify({ authorization_code })
  window.location.href = `${urlParameters.redirect_uri}?${redirectUrlParams}`
}

function Authorize() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const firstNameRef = useRef()
  const lastNameRef = useRef()

  const [input, setInput] = useState(0)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  })

  useEffect(() => {
    switch (input) {
      case 0:
        if (emailRef.current) emailRef.current.focus()
        break
      case 1:
        if (passwordRef.current) passwordRef.current.focus()
        break
      case 2:
        if (firstNameRef.current) firstNameRef.current.focus()
        break
      default:
        break
    }
  })

  return (
    <Layout>
      <Seo title="Sign In" />

      <Main input={input}>
        <ProgressBar progress={`${(input + 1) * 25}%`} />

        <Nav>
          <NavIcon
            src={backIcon}
            alt="Back"
            onClick={() => {
              if (input === 0) window.history.back();
              else setInput(input - 1)
            }}
          />
        </Nav>

        <Form>
          <InputContainer>
            {input === 0 && (
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
            {input === 1 && (
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
            {input === 2 && (
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
            {input === 3 && (
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
          </InputContainer>
          <Button
            onClick={() => {
              if (input === 3) submitForm(formData)
              else setInput(input + 1)
            }}
          >
            {input === 3 ? "Finish" : "Next"}
          </Button>
        </Form>
      </Main>
    </Layout>
  )
}

export default Authorize