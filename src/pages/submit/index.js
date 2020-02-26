import React, { Component } from 'react';
import Header from '../header';
import styles from './index.less';
import { Button } from 'antd';
import router from 'umi/router';

export default class index extends Component {
  render() {
    return (
      <div>
        <Header title="支付订单" />
        <div className={styles.orderRongqi}>
          <h3 className={styles.fontStyleColor}>欢迎小伙伴们打赏</h3>
          <ul className={styles.listOrder}>
            <li>
              <img
                alt="微信"
                src="https://cdn.jsdelivr.net/gh/2662419405/imgs/tu/mm_facetoface_collect_qrcode_1582699961107.png"
              />
            </li>
            <li>
              <img
                alt="支付宝"
                src="https://cdn.jsdelivr.net/gh/2662419405/imgs/tu/1582699863433.jpg"
              />
            </li>
          </ul>
          <h3 className={styles.fontStyleColor}>
            下方支付为虚拟支付,为了后续的项目,对于订单的管理和评论等(至于真正的支付,抱歉,做不到=-=)
          </h3>
          <Button
            type="primary"
            className={styles.changeOrderBtn}
            onClick={() => router.push('/result')}
          >
            确认支付
          </Button>
        </div>
      </div>
    );
  }
}
