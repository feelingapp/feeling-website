import React from "react"
import styled from "styled-components"
import Spinner from "react-md-spinner"

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`

interface Props {
  show: boolean
}

const Loading = (props: Props) =>
  props.show && (
    <Container>
      <Spinner singleColor="#fefefe" size={40} borderSize={6} />
    </Container>
  )

export default Loading
