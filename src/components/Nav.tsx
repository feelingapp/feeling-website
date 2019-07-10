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

const IconPlaceHolder = styled.div`
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
    {props.leftIcon ? (
      <Icon
        src={props.leftIcon.src}
        alt={props.leftIcon.alt}
        onClick={props.leftIcon.onClick}
      />
    ) : (
      <IconPlaceHolder />
    )}

    <Title>{props.title}</Title>

    {props.rightIcon ? (
      <Icon
        src={props.rightIcon.src}
        alt={props.rightIcon.alt}
        onClick={props.rightIcon.onClick}
      />
    ) : (
      <IconPlaceHolder />
    )}
  </Container>
)

export default Nav
