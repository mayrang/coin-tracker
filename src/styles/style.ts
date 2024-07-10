import styled from "styled-components";

export const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

export const Header = styled.div`
  font-size: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10dvh;
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-weight: 800;
`;

export const Loading = styled.div`
  font-size: 24px;
  text-align: center;
  padding: 24px 0;
`;
