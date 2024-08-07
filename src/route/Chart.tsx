import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { fetchCoinHistorical } from "../api/coin";
import { Loading } from "../styles/style";
import ApexCharts from "react-apexcharts";
import { ICoinHistorical } from "../model/data";
import { useRecoilValue } from "recoil";
import { themeState } from "../atom/theme";

export default function Chart() {
  const { coinId = "" } = useParams();
  const theme = useRecoilValue(themeState);
  const {
    data = [],
    isLoading,
    error,
  } = useQuery<ICoinHistorical[]>({
    queryKey: ["coin", "historical", coinId],
    queryFn: () => fetchCoinHistorical(coinId),
    refetchInterval: 1000 * 60 * 30,
  });
  const chartData = data.map((item) => ({
    x: new Date(item.time_close * 1000).toUTCString(),
    y: [item.open, item.high, item.low, item.close],
  }));
  console.log(chartData);
  return (
    <div>
      {isLoading || error ? (
        <Loading>loading...</Loading>
      ) : (
        <ApexCharts
          type="candlestick"
          series={[
            {
              data: chartData,
            },
          ]}
          options={{
            chart: {
              background: "transparents",
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
            },
            xaxis: {
              labels: {
                show: true,
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              type: "datetime",
              categories: data?.map((price) => new Date(price.time_close * 1000).toUTCString()),
            },
            yaxis: {
              show: false,
            },
            grid: { show: false },
            tooltip: {
              x: {
                format: "dd 'MMM",
              },
            },
            theme: {
              mode: theme,
            },
          }}
        />
      )}
    </div>
  );
}
