import React, { Component } from 'react';
import Header from '../../header';
import Footer from '../../footer';
import styles from './index.less';
import Link from 'umi/link';
import data from '../../../data/quans.json';

export default class index extends Component {
  render() {
    return (
      <div>
        <Header title="我的抵用券" more={true} rightShow={true} />
        <div className={styles.btn_help}>
          <Link className={styles.btn_helpDemo} to="/account/quans/help">
            帮助
            <strong></strong>
            <img
              src="https://p0.meituan.net/travelcube/7afe1164886b2af4ed4ea32b94bee6dd621.png"
              alt="help"
            />
          </Link>
        </div>
        <h4 className={styles.btnHelpTitle}>抵用券</h4>
        <div className={styles.listQuans}>
          {data.data.map((v, i) => {
            return (
              <div
                key={i}
                className={[v.guo ? styles.moneycard_disabled : null, styles.moneycard].join(' ')}
              >
                <div className={styles.react}>
                  <div className={styles.moneycard_value}>{v.price}元</div>
                  <div className={styles.moneycard_desc}>
                    <div>
                      <h6>{v.title}</h6>
                      <p className={styles.moneycard_des}>{v.miaoshu}</p>
                    </div>
                    <div className={styles.moneycard_time}>
                      <span>{v.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Footer />
      </div>
    );
  }
}
