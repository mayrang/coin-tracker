import React, { useEffect, useState } from "react";
import { Container, Header, Loading, Title } from "../styles/style";
import { Link, Outlet, useLocation, useMatch, useParams } from "react-router-dom";
import { CoinInfo, CoinPriceInfo } from "../model/data";
import styled from "styled-components";

type IParams = {
  coinId: string;
};

type IState = {
  name: string;
};

const Overview = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 12px 0px;
  padding: 12px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.itemBgColor};
`;

const Description = styled.p`
  font-size: 22px;
  padding: 12px 0;
  box-sizing: border-box;
`;

const OverviewItem = styled.div`
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

const Tab = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin: 25px 0;
`;

const TabItem = styled.div<{ isActive: boolean }>`
  background-color: ${(props) => props.theme.itemBgColor};
  color: ${(props) => (props.isActive ? props.theme.accentColor : props.theme.textColor)};
  padding: 8px 0;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
`;

export default function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams() as IParams;
  const location = useLocation();

  const state = location.state as IState | null;
  const [info, setInfo] = useState<CoinInfo>();
  const [priceInfo, setPriceInfo] = useState<CoinPriceInfo>();
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  useEffect(() => {
    (async () => {
      const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
      const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>{state?.name ? state.name : loading ? "lodaing.." : info?.name}</Title>
      </Header>
      {loading ? (
        <Loading>loading.....</Loading>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>symbol:</span>
              <span>{info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>source:</span>
              <span>{info?.open_source ? "true" : "false"}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>total supply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>max supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tab>
            <TabItem isActive={priceMatch !== null}>
              <Link to={"price"} state={{ name: info?.name }}>
                Price
              </Link>
            </TabItem>
            <TabItem isActive={chartMatch !== null}>
              <Link to={"chart"} state={{ name: info?.name }}>
                Chart
              </Link>
            </TabItem>
          </Tab>
          <Outlet />
        </>
      )}
    </Container>
  );
}
