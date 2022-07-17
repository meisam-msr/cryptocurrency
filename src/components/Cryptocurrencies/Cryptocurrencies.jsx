import { Card, Col, Row } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "services/cryptoApi";
import { longNumToStr } from "utils/longNumToStr";
import styles from "./cryptocurrencies.module.css";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);

  console.log(cryptos);

  if (isFetching) return "Loading...";

  return (
    <>
      <Row gutter={[32, 32]} className={styles.cryptoCardContainer}>
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className={styles.cryptoCard}
            key={currency.id}
          >
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank} ${currency.name}`}
                extra={
                  <img className={styles.cryptoImg} src={currency.iconUrl} />
                }
                hoverable
              >
                <p>Price: {longNumToStr(currency.price)}</p>
                <p>MArket Cap: {longNumToStr(currency.marketCap)}</p>
                <p>Daily Change: {longNumToStr(currency.change)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
