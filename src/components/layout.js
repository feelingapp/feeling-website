import React from "react"
import PropTypes from "prop-types"
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  html, body {
    font-size: 62.5%;
    background: #fefefe;
  }
`

const Layout = ({ children }) => (
  <>
    <GlobalStyle />
    {children}
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
