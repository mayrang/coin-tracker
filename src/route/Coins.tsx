import { ICoins } from "../model/data";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Container, Header, Loading, Title } from "../styles/style";
import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "../api/coin";
import { Helmet } from "react-helmet-async";

const CoinList = styled.ul`
  margin: 12px 0;
`;

const Coin = styled.li`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;

  margin: 16px 0;
  a {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 24px;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
`;

export default function Coins() {
  const { data: coins, isLoading } = useQuery<ICoins[]>({
    queryKey: ["coins"],
    queryFn: fetchCoins,
  });

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
      </Header>
      {isLoading ? (
        <Loading>loading.....</Loading>
      ) : (
        <CoinList>
          {coins?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link state={{ name: coin.name }} to={`${coin.id}`}>
                <Img
                  src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`}
                  alt={`${coin.name} image`}
                />
                <div>{coin.name} &rarr;</div>
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}
