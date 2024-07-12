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
  console.log(data, error);
  return (
    <div>
      {isLoading || error ? (
        <Loading>loading...</Loading>
      ) : (
        <ApexCharts
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((item) => Number(item.close)),
            },
          ]}
          options={{
            chart: {
              height: 300,
              width: 500,
              background: "transparents",
              toolbar: {
                show: false,
              },
            },
            theme: {
              mode: "dark",
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: theme === "light" ? ["#f1c40f"] : ["#2ecc71"],
                stops: [0, 100],
              },
            },
            stroke: {
              width: 4,
              curve: "smooth",
            },
            tooltip: {
              x: {
                format: "dd 'MMM",
              },
              y: {
                formatter: (value) => `$${value.toFixed(3)}`,
              },
            },
            colors: theme === "light" ? ["#e74c3c"] : ["#3498db"],
            grid: { show: false },
            xaxis: {
              labels: {
                show: false,
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
          }}
        />
      )}
    </div>
  );
}
