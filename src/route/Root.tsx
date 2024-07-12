import React from "react";
import { Link, Outlet, useMatch } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  max-width: 480px;
  margin: 12px auto;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const Button = styled.div`
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

export default function Root() {
  const matchHome = useMatch("/");

  return (
    <>
      <Container>
        {matchHome ? (
          <div></div>
        ) : (
          <Button>
            <Link to={`${process.env.PUBLIC_URL}`}>Home</Link>
          </Button>
        )}
        <ThemeToggle />
      </Container>

      <Outlet />
    </>
  );
}
