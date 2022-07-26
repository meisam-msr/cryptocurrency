import React from "react";
import { Spin } from "antd";
import styles from "./loader.module.css";

const Loader = () => (
  <div className={styles.loader}>
    <Spin />
  </div>
);

export default Loader;
