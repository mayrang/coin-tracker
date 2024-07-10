import React, { useEffect, useState } from "react";
import { Container, Header, Loading, Title } from "../styles/style";
import { useLocation, useParams } from "react-router-dom";
import { CoinInfo, CoinPriceInfo } from "../model/data";

type IParams = {
  coinId: string;
};

type IState = {
  name: string;
};

export default function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams() as IParams;
  const location = useLocation();
  const { name } = location.state as IState;
  const [info, setInfo] = useState<CoinInfo>();
  const [priceInfo, setPriceInfo] = useState<CoinPriceInfo>();
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
        <Title>{name || "loading.."}</Title>
      </Header>
      {loading ? (
        <Loading>loading.....</Loading>
      ) : (
        <span>
          {info?.name}
          {priceInfo?.quotes.USD.price}
        </span>
      )}
    </Container>
  );
}
