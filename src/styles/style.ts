import styled from "styled-components";

export const Container = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
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

export const OverviewItem = styled.div`
  text-align: center;
  span {
    display: block;
    line-height: 22px;
  }
  font-size: 18px;
  color: ${(props) => props.theme.textColor};
  span:first-child {
    font-size: 14px;
  }
`;

export const Overview = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin: 12px 0px;
  padding: 12px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.itemBgColor};
`;
