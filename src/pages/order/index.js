import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import styles from './index.less';
import { connect } from 'dva';
import { Button } from 'antd';
import Link from 'umi/link';
import { InputNumber, message } from 'antd';
import router from 'umi/router';

export default
@connect(
  state => {
    return {
      arr: state.list.arr,
      isLogin: state.user.isLogin,
      userinfo: state.user.userinfo,
    };
  },
  {
    getList: () => ({
      type: 'list/getList', //aciton的type需要加上命名空间
    }),
  },
)
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 1,
    };
  }

  componentDidMount() {
    this.props.getList();
  }

  handlerOnBlur = value => {
    this.setState({
      totalPrice: value,
    });
  };

  render() {
    let { arr, isLogin, userinfo } = this.props;
    let detailArr = {};
    arr.forEach((v, i) => {
      if (this.props.match.params.index == i) {
        detailArr = v;
      }
    });
    return (
      <div>
        <Header title="提交订单" more={true} rightShow={true} />
        <div className={styles.flexBoxOrder}>
          <div className={styles.contentTitleOrder}>{detailArr.name}</div>
          <div className={styles.formMbWrapper}>
            <div className={styles.msListLine}>
              <div className={styles.textLight}>单价:</div>
              <div className={styles.flexTwo}>{detailArr.new}元</div>
            </div>
            <div className={styles.msListLine}>
              <div className={styles.textLight}>数量：</div>
              <div className={[styles.minus, styles.flexTwo].join(' ')}>
                <InputNumber
                  disabled={!isLogin}
                  onChange={this.handlerOnBlur}
                  min={1}
                  max={9999}
                  defaultValue={1}
                />
              </div>
            </div>
            <div className={styles.msListLine}>
              <div className={styles.textLight}>总价:</div>
              <div className={[styles.flexTwo, styles.totalDetail].join(' ')}>
                {this.state.totalPrice * detailArr.new}元
              </div>
            </div>
          </div>
          <div className={styles.formMbWrapper} onClick={() => message.error('暂时不支持抵用券')}>
            <div className={styles.msListLine}>
              <div className={styles.textLight}>抵用券</div>
              <div className={styles.flexTwo}>
                <span className={styles.changeHui}>></span>
              </div>
            </div>
          </div>
          <div className={styles.formMbWrapper}>
            <div className={styles.msListLine}>
              <div className={styles.textLight}>还需支付</div>
              <div className={[styles.flexTwo, styles.totalDetail].join(' ')}>
                {this.state.totalPrice * detailArr.new}元
              </div>
            </div>
          </div>
          <div className={styles.contentTitleOrder}>你绑定的手机号码</div>
          <div className={styles.formMbWrapper}>
            <div className={styles.msListLine}>
              <div className={styles.textLight}>
                {userinfo && userinfo.phone.substr(0, 3) + '****' + userinfo.phone.substr(7)}
              </div>
              <div className={styles.flexTwo}>
                <Link to="/account/phone">绑定新手机号&nbsp;></Link>
              </div>
            </div>
          </div>
          {isLogin ? (
            <div className={styles.tags}>
              <ul className={styles.advantage}>
                <li>
                  <span
                    style={{ color: detailArr.guo == 'false' ? '#666' : null }}
                    className="iconfont icon-tuikuan"
                  ></span>
                  <p style={{ color: detailArr.sui == 'false' ? '#666' : null }}>
                    {detailArr.sui == 'false' ? '不支持随时退款' : '支持随时退款'}
                  </p>
                </li>
                <li>
                  <span
                    style={{ color: detailArr.guo == 'false' ? '#666' : null }}
                    className="iconfont icon-tuikuan"
                  ></span>
                  <p style={{ color: detailArr.guo == 'false' ? '#666' : null }}>
                    {detailArr.guo == 'false' ? '不支持过期自动退' : '支持过期自动退'}
                  </p>
                </li>
              </ul>
            </div>
          ) : null}
          <div className={styles.orderRongqi}>
            <Button
              disabled={!isLogin}
              type="primary"
              className={styles.changeOrderBtn}
              onClick={() => router.push('/submit')}
            >
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
