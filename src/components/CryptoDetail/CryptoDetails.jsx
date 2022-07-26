import {
  CheckOutlined,
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  NumberOutlined,
  StopOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { Col, Row, Select } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "services/cryptoApi";
import millify from "millify";
import styles from "./cryptoDetail.module.css";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import HTMLReactParser from "html-react-parser";
import LineChart from "components/LineChart/LineChart";
import Loader from "components/Loader/Laoder";
const { Option } = Select;

const CryptoDetails = () => {
  const { cryptoId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(cryptoId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    cryptoId,
    timePeriod,
  });
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <Loader/>;

  const time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "listed at",
      value: `$ ${cryptoDetails?.listedAt && millify(cryptoDetails?.listedAt)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col className={styles.coinDetailContainer}>
      <Col className={styles.coinHeadingContainer}>
        <Title level={2} className={styles.coinName}>
          {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
        </Title>
        <p>
          {cryptoDetails?.name} live price in US dollars. View value statistics,
          market cap and supply.
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className={styles.selectTimeperiod}
        placeholder="Select Time Period"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails?.price)}
        coinName={cryptoDetails?.name}
      />
      <Col className={styles.statsContainer}>
        <Col className={styles.coinValueStatistics}>
          <Col className={styles.coinValueStatisticsHeading}>
            <Title level={3} className={styles.coinDetailsHeading}>
              {cryptoDetails?.name} value statistics
            </Title>
            <p>An overview showing the stats of {cryptoDetails?.name}</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col key={title} className={styles.coinStats}>
              <Col className={styles.coinStatsName}>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className={styles.stats}>{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className={styles.otherStatsInfo}>
          <Col className={styles.coinValueStatisticsHeading}>
            <Title level={3} className={styles.coinDetailsHeading}>
              other statistics
            </Title>
            <p>An overview showing the stats of all cryptocurrencies</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col key={title} className={styles.coinStats}>
              <Col className={styles.coinStatsName}>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className={styles.stats}>{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className={styles.coinDescLink}>
        <Row className={styles.coinDesc}>
          <Text className={styles.coinDetailsHeading}>
            What is {cryptoDetails?.name}
            {HTMLReactParser(cryptoDetails ? cryptoDetails.description : "")}
          </Text>
        </Row>
        <Col className={styles.coinLinks}>
          <Text className={styles.coinDetailsHeading}>
            {cryptoDetails?.name} Links
          </Text>
          {cryptoDetails?.links.map((link) => (
            <Row className={styles.coinLink} key={link.name}>
              <Title level={5} className={styles.linkName}>
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
