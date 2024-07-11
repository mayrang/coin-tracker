import React from "react";
import { Container, Header, Loading, Title } from "../styles/style";
import { Link, Outlet, useLocation, useMatch, useParams } from "react-router-dom";

import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { CoinInfo, CoinTickers } from "../model/data";
import { fetchCoinInfo, fetchCoinTickers } from "../api/coin";
import { Helmet } from "react-helmet-async";

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
  const { coinId } = useParams() as IParams;
  const location = useLocation();

  const state = location.state as IState | null;

  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const { data: infoData, isLoading: infoLoading } = useQuery<CoinInfo>({
    queryKey: ["coin", "info", coinId],
    queryFn: () => fetchCoinInfo(coinId),
    refetchInterval: 1000 * 60 * 30,
  });
  const { data: tickersData, isLoading: tickersLoading } = useQuery<CoinTickers>({
    queryKey: ["coin", "tickers", coinId],
    queryFn: () => fetchCoinTickers(coinId),
  });
  const loading = tickersLoading || infoLoading;

  return (
    <Container>
      <Helmet>
        <title>{state?.name ? state.name : loading ? "lodaing.." : infoData?.name}</title>
      </Helmet>
      <Header>
        <Title>{state?.name ? state.name : loading ? "lodaing.." : infoData?.name}</Title>
      </Header>
      {loading ? (
        <Loading>loading.....</Loading>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>price:</span>
              <span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>total supply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>max supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tab>
            <TabItem isActive={priceMatch !== null}>
              <Link to={"price"} state={{ name: infoData?.name }}>
                Price
              </Link>
            </TabItem>
            <TabItem isActive={chartMatch !== null}>
              <Link to={"chart"} state={{ name: infoData?.name }}>
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
