import React from "react"
import styled from "styled-components"

const Container = styled.nav`
  height: 56px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 4px;
`

const Icon = styled.img`
  height: 48px;
  width: 48px;
  padding: 12px;
`

const Title = styled.h1`
  flex: 1;
  font-size: 2rem;
  text-align: center;
  font-weight: 500;
`

interface Props {
  title: string
  leftIcon?: {
    src: string
    alt: string
    onClick: () => any
  }
  rightIcon?: {
    src: string
    alt: string
    onClick: () => any
  }
}

const Nav = (props: Props) => (
  <Container>
    <Icon
      src={props.leftIcon && props.leftIcon.src}
      alt={props.leftIcon && props.leftIcon.alt}
      onClick={props.leftIcon && props.leftIcon.onClick}
    />

    <Title>{props.title}</Title>

    <Icon
      src={props.rightIcon && props.rightIcon.src}
      alt={props.rightIcon && props.rightIcon.alt}
      onClick={props.rightIcon && props.rightIcon.onClick}
    />
  </Container>
)

export default Nav
