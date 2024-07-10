import React, { useEffect, useState } from "react";
import { CoinInterface } from "../model/data";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.div`
  font-size: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10dvh;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-weight: 800;
`;

const CoinList = styled.ul`
  margin: 12px 0;
`;

const Coin = styled.li`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;

  margin: 16px 0;
  a {
    display: block;
    padding: 24px;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Loading = styled.div`
  font-size: 24px;
  text-align: center;
  padding: 24px 0;
`;

export default function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);

  console.log(coins);

  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      {loading ? (
        <Loading>loading.....</Loading>
      ) : (
        <CoinList>
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}
