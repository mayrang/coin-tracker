import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { fetchCoinHistorical } from "../api/coin";
import { Loading } from "../styles/style";
import ApexCharts from "react-apexcharts";
import { ICoinHistorical } from "../model/data";

export default function Chart() {
  const { coinId = "" } = useParams();
  const { data = [], isLoading } = useQuery<ICoinHistorical[]>({
    queryKey: ["coin", "historical", coinId],
    queryFn: () => fetchCoinHistorical(coinId),
    refetchInterval: 1000 * 60 * 30,
  });
  console.log(data.map((item) => Number(item.close)));
  return (
    <div>
      {isLoading || data.length === 0 ? (
        <Loading>loading...</Loading>
      ) : (
        <ApexCharts
          type="line"
          series={[
            {
              name: "Price",
              data: data.map((item) => Number(item.close)),
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
                gradientToColors: ["#2ecc71"],
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
            colors: ["#3498db"],
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
