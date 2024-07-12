import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  max-width: 480px;
  margin: 0 auto;
  height: 100dvh;
  align-items: center;
  justify-content: center;
  gap: 12px;
  a:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const Title = styled.h2`
  color: ${(props) => props.theme.accentColor};
  font-weight: 800;
  font-size: 32px;
`;

export default function NotFound() {
  return (
    <Container>
      <Title>NOT FOUND PAGE</Title>
      <Link to={`${process.env.PUBLIC_URL}`}>홈으로 가기 &rarr;</Link>
    </Container>
  );
}
