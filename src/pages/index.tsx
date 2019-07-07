import React from "react"
import styled from "styled-components"

import Layout from "../components/Layout"
import Seo from "../components/Seo"
import logo from "../images/logo.svg"

const Main = styled.main`
  margin: 12px;
  min-height: calc(100vh - 24px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fefefe;
  border-top: 12px solid #caeaf8;
  border-right: 12px solid #f8edca;
  border-bottom: 12px solid #f8caca;
  border-left: 12px solid #e4d0f2;
`

const Logo = styled.img`
  width: 50vw;
  max-height: 200px;
`

const Heading = styled.h1`
  margin-top: 32px;
  font-size: 1.8rem;
  font-weight: normal;
`

const Index = () => (
  <Layout>
    <Seo title="Sign In" />

    <Main>
      <Logo src={logo} alt="Feeling logo" />
      <Heading>👋 Coming soon to Android</Heading>
    </Main>
  </Layout>
)

export default Index
