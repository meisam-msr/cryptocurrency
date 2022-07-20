import { Col, Row } from "antd";
import Title from "antd/lib/typography/Title";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styles from "./lineChart.module.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(
      new Date(
        coinHistory?.data?.history[i].timestamp * 1000
      ).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      y: {
          // beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Row className={styles.chartHeader}>
        <Title level={2} className={styles.chartTitle}>
          {coinName} Price chart
        </Title>
        <Col className={styles.priceContainer}>
          <Title level={5} className={styles.priceChange}>
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className={styles.currentPrice}>
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
