import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import styles from './index.less';
import { Button } from 'antd';
import Data from '../../data/search.json';
import Link from 'umi/link';
import { connect } from 'dva';

export default
@connect(
  state => {
    return {
      result: state.list.result,
    };
  },
  {
    getSuggest: value => ({
      type: 'list/keySuggest',
      value,
    }),
  },
)
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      focu: false,
      value: '',
    };
  }

  handlerChangeFocus = value => {
    this.setState({
      focu: value,
    });
  };

  changeHandlerValue = e => {
    this.setState({
      value: e.target.value,
    });
    this.props.getSuggest(e.target.value);
  };

  render() {
    const { result } = this.props;
    const { show, focu, value } = this.state;

    return (
      <div>
        <Header title="搜索" account={true} search={true} />
        <div className={styles.banner_download}>
          <div className={styles.bannerItem}>
            <img
              className={styles.imgBox}
              src="https://p1.meituan.net/travelcube/7264ce9c25de2e464e3acd996fe8ad362803.png"
              alt="logo"
            />
            <div className={styles.logoTheme}>
              <p className={styles.logoTit}>省钱利器 购物超划算</p>
              <p className={styles.logoDesc}>吃喝玩乐尽在美团</p>
            </div>
          </div>
          <div className={styles.toAppBtn}>
            <span className={styles.callApp}>去APP</span>
          </div>
        </div>
        <div className={styles.heightCenter}></div>
        <div className={styles.searchForm}>
          <div className={styles.boxFlex}>
            <i className={styles.iconSearch}>
              <span className="iconfont icon-sousuo"></span>
            </i>
            <input
              className={styles.keyword}
              type="text"
              placeholder="输入商家名、品类或商圈"
              autoComplete="off"
              value={value}
              onChange={this.changeHandlerValue}
              onFocus={() => {
                this.handlerChangeFocus(true);
              }}
              onBlur={() => {
                this.handlerChangeFocus(false);
              }}
            />
          </div>
          <Button disabled={show} type="primary" className={styles.btnPri}>
            搜索
          </Button>
        </div>
        <div
          className={styles.listIn}
          style={{ display: focu || value.length > 0 ? 'none' : 'block' }}
        >
          <ul>
            {Data.data.map((v, i) => {
              return (
                <li key={i}>
                  <Link to={v.url} style={{ color: i === 0 ? '#fdb338' : null }}>
                    {v.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className={styles.sousuoContent}
          style={{ display: value.length > 0 ? 'block' : 'none' }}
        >
          <ul>
            {result.length > 0 &&
              result.map((v, i) => {
                return (
                  <li className={styles.listItems} key={i}>
                    <Link to={{ pathname: v.editorWord }}>
                      <span className={styles.itemSearch}>
                        <span className="iconfont icon-sousuo"></span>
                        <strong> {v.editorWord}</strong>
                      </span>
                      <span className={styles.resultCount}>约{v.recType}个团购结果</span>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className={styles.heightCenter}></div>
        <Footer />
      </div>
    );
  }
}
