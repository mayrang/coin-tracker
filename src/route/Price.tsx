import React from "react";
import { Container, Overview, OverviewItem, Title } from "../styles/style";
import { useQuery } from "@tanstack/react-query";
import { CoinTickers } from "../model/data";
import { fetchCoinTickers } from "../api/coin";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const PriceOverview = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: 12px 0px;
  padding: 12px;
  border-radius: 15px;
`;

const PriceOverviewItem = styled.div`
  text-align: center;
  span {
    display: block;
    line-height: 28px;
  }
  font-size: 26px;
  color: ${(props) => props.theme.textColor};
  span:first-child {
    font-size: 18px;
  }
`;

const ChangeSpan = styled.span<{ upDown: "up" | "down" }>`
  font-size: 14px;
  color: ${(props) => (props.upDown === "up" ? "#e74c3c" : "#2980b9")};
`;

const Table = styled.table`
  width: 100%;
  margin: 20px 0;
  thead th {
    padding: 20px;
    background-color: ${(props) => props.theme.itemBgColor};
    border-collapse: collapse;
    width: 50%;
    &:first-child {
      border-top-left-radius: 15px;
    }
    &:last-child {
      border-top-right-radius: 15px;
    }
  }

  tbody td {
    text-align: center;
    padding: 12px;
    border: 1px solid ${(props) => props.theme.itemBgColor};
    border-collapse: collapse;
    width: 50%;
  }
`;

const PriceTd = styled.td<{ upDown: "up" | "down" }>`
  color: ${(props) => (props.upDown === "up" ? "#e74c3c" : "#2980b9")};
`;

const SubTitle = styled.h2`
  font-size: 24px;
  text-align: center;
  display: block;
  padding: 12px 0;
  line-height: 32px;
`;

const SmallSpan = styled.span`
  font-size: 14px;
`;

export default function Price() {
  const { coinId = "" } = useParams();
  const { data: tickersData, isLoading: tickersLoading } = useQuery<CoinTickers>({
    queryKey: ["coin", "tickers", coinId],
    queryFn: () => fetchCoinTickers(coinId),
  });
  const price = tickersData?.quotes.USD;
  console.log("price", price);
  return (
    <div>
      <PriceOverview>
        <PriceOverviewItem>
          <span>현재 가격:</span>
          <span>${price?.price.toFixed(2)}</span>
        </PriceOverviewItem>
      </PriceOverview>
      <Overview>
        <OverviewItem>
          <span>24시간 거래량:</span>
          <span>{price?.volume_24h.toFixed(2)}</span>
          <ChangeSpan upDown={price?.volume_24h_change_24h && price?.volume_24h_change_24h > 0 ? "up" : "down"}>
            {price?.volume_24h_change_24h.toFixed(2)}%
          </ChangeSpan>
        </OverviewItem>
        <OverviewItem>
          <span>시가총액:</span>
          <span>{price?.market_cap.toFixed(2)}</span>
          <ChangeSpan upDown={price?.market_cap_change_24h && price?.market_cap_change_24h > 0 ? "up" : "down"}>
            {price?.market_cap_change_24h.toFixed(2)}%
          </ChangeSpan>
        </OverviewItem>
      </Overview>
      <SubTitle>변동률</SubTitle>
      <Table>
        <thead>
          <tr>
            <th>시간</th>
            <th>변동률</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>15분</td>
            <PriceTd upDown={price?.percent_change_15m && price?.percent_change_15m > 0 ? "up" : "down"}>
              {price?.percent_change_15m.toFixed(2)}%
            </PriceTd>
          </tr>
          <tr>
            <td>30분</td>
            <PriceTd upDown={price?.percent_change_30m && price?.percent_change_30m > 0 ? "up" : "down"}>
              {price?.percent_change_30m.toFixed(2)}%
            </PriceTd>
          </tr>
          <tr>
            <td>1시간</td>
            <PriceTd upDown={price?.percent_change_1h && price?.percent_change_1h > 0 ? "up" : "down"}>
              {price?.percent_change_1h.toFixed(2)}%
            </PriceTd>
          </tr>
          <tr>
            <td>6시간</td>
            <PriceTd upDown={price?.percent_change_6h && price?.percent_change_6h > 0 ? "up" : "down"}>
              {price?.percent_change_6h.toFixed(2)}%
            </PriceTd>
          </tr>
          <tr>
            <td>12시간</td>
            <PriceTd upDown={price?.percent_change_12h && price?.percent_change_12h > 0 ? "up" : "down"}>
              {price?.percent_change_12h.toFixed(2)}%
            </PriceTd>
          </tr>
          <tr>
            <td>24시간</td>
            <PriceTd upDown={price?.percent_change_24h && price?.percent_change_24h > 0 ? "up" : "down"}>
              {price?.percent_change_24h.toFixed(2)}%
            </PriceTd>
          </tr>
          <tr>
            <td>7일</td>
            <PriceTd upDown={price?.percent_change_7d && price?.percent_change_7d > 0 ? "up" : "down"}>
              {price?.percent_change_7d.toFixed(2)}%
            </PriceTd>
          </tr>
          <tr>
            <td>30일</td>
            <PriceTd upDown={price?.percent_change_30d && price?.percent_change_30d > 0 ? "up" : "down"}>
              {price?.percent_change_30d.toFixed(2)}%
            </PriceTd>
          </tr>
          <tr>
            <td>1년</td>
            <PriceTd upDown={price?.percent_change_1y && price?.percent_change_1y > 0 ? "up" : "down"}>
              {price?.percent_change_1y.toFixed(2)}%
            </PriceTd>
          </tr>
        </tbody>
      </Table>
      <PriceOverview>
        <PriceOverviewItem>
          <span>역대 최고가:</span>
          <span>${price?.ath_price.toFixed(2)}</span>
          <SmallSpan>({price?.ath_date ? new Date(price.ath_date).toLocaleDateString("ko-KR") : ""})</SmallSpan>
          <ChangeSpan upDown={price?.percent_from_price_ath && price?.percent_from_price_ath > 0 ? "up" : "down"}>
            {price?.percent_from_price_ath.toFixed(2)}%
          </ChangeSpan>
        </PriceOverviewItem>
      </PriceOverview>
    </div>
  );
}
