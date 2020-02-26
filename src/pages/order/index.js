import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import styles from './index.less';
import { connect } from 'dva';
import { Button } from 'antd';
import Link from 'umi/link';

export default
@connect(
  state => {
    return {
      arr: state.list.arr,
      isLogin: state.user.isLogin,
    };
  },
  {
    getList: () => ({
      type: 'list/getList', //aciton的type需要加上命名空间
    }),
  },
)
class index extends Component {
  componentDidMount() {
    this.props.getList();
  }
  render() {
    const pathName = this.props.location.pathname;
    let { arr, isLogin } = this.props;
    let detailArr = {};
    arr.forEach((v, i) => {
      if (this.props.match.params.index == i) {
        detailArr = v;
      }
    });
    return (
      <div>
        <Header title="提交订单" account={true} />
        <div className={styles.flexBoxOrder}>
          <div className={styles.contentTitleOrder}>{detailArr.name}</div>
          <div className={styles.orderRongqi}>
            <Button disabled={!isLogin} type="primary" className={styles.changeOrderBtn}>
              提交订单
            </Button>
          </div>
          {isLogin ? null : (
            <div className={styles.quickLogin}>
              请登录后进行购买，去
              <Link to={{ pathname: '/login' }}>登录</Link>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}
