import { Col, Row, Statistic, Typography } from "antd";
import React from "react";
import styles from "./homePage.module.css";
import { useGetCryptosQuery } from "services/cryptoApi";
import { longNumToStr } from "utils/longNumToStr";
import { Link } from "react-router-dom";
import Cryptocurrencies from "components/Cryptocurrencies/Cryptocurrencies";
import News from "components/News";
const { Title } = Typography;

const HomePage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return "Loading...";

  return (
    <>
      <Title level={2} className={styles.heading}>
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={longNumToStr(globalStats.total)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={longNumToStr(globalStats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={longNumToStr(globalStats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={longNumToStr(globalStats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market"
            value={longNumToStr(globalStats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className={styles.homeHeadingContainer}>
        <Title level={2} className={styles.homeTitle}>
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className={styles.showMore}>
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className={styles.homeHeadingContainer}>
        <Title level={2} className={styles.homeTitle}>
          Latest Crypto News
        </Title>
        <Title level={3} className={styles.showMore}>
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default HomePage;
