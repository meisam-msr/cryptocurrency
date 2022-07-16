import { Col, Row, Statistic, Typography } from "antd";
import React from "react";
import styles from "./homePage.module.css";
const { Title } = Typography;

const HomePage = () => {
  return (
    <>
      <Title level={2} className={styles.heading}>
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value="5" />
        </Col>
        <Col span={12}>
          <Statistic title="Total Exchanges" value="5" />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap" value="5" />
        </Col>
        <Col span={12}>
          <Statistic title="Total 24h Volume" value="5" />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market" value="5" />
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
