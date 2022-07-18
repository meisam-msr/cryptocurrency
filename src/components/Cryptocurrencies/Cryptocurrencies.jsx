import { Card, Col, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "services/cryptoApi";
import { longNumToStr } from "utils/longNumToStr";
import styles from "./cryptocurrencies.module.css";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return "Loading...";

  return (
    <>
      {!simplified && (
        <div className={styles.searchCrypto}>
          <Input.Search
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
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
