import React, { Component, Fragment } from 'react';
import styles from './index.less';
import Link from 'umi/link';
import router from 'umi/router';
import data from '../../data/account_header.json';
import { ActionSheet } from 'antd-mobile';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  returnTip = () => {
    if (window.location.pathname === '/account') {
      router.push('/');
    } else {
      router.go(-1);
    }
  };

  showTip = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  dataList = [
    { url: 'OpHiXAcYzmPQHcdlLFrc', title: '发送给朋友' },
    { url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
    { url: 'cTTayShKtEIdQVEMuiWt', title: '生活圈' },
    { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
    { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' },
  ].map(obj => ({
    icon: (
      <img
        src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`}
        alt={obj.title}
        style={{ width: 36 }}
      />
    ),
    title: obj.title,
  }));

  showShare = () => {
    ActionSheet.showShareActionSheetWithOptions({
      options: this.dataList,
      title: '分享到',
    });
  };

  render() {
    const { ding, title, account, share, search, rightShow, more } = this.props;
    // rightShow 是否显示右侧  share是否显示分享 search 是否显示搜索, account是否显示主页 more是否显示更多
    return (
      <Fragment>
        <header
          id="account"
          className={[styles.accountHeader, ding ? styles.dingWei : null].join(' ')}
        >
          <div className={styles.navWarpLeft}>
            <span onClick={this.returnTip}>
              <img
                src="https://p1.meituan.net/travelcube/53361fd0bb6b333e779377789a8d669e531.png"
                alt="return"
              />
            </span>
          </div>
          <span className={styles.accountSpan}>{title}</span>
          {/* 是否显示右侧 */}
          {rightShow ? (
            <div>
              <div className={styles.navWarpRight}>
                {account ? (
                  <div>
                    <Link to="/">
                      <span>
                        <img
                          src="https://p1.meituan.net/travelcube/142ba119b889881105236ef57446e6bf866.png"
                          alt="主页"
                        />
                      </span>
                    </Link>
                  </div>
                ) : null}
                {search ? (
                  <div>
                    <Link to="/search">
                      <span>
                        <img
                          src="https://p0.meituan.net/travelcube/4b45dc09c35f9175498345f8672d08991022.png"
                          alt="搜索"
                        />
                      </span>
                    </Link>
                  </div>
                ) : null}
                {more ? (
                  <div onClick={this.showTip}>
                    <span>
                      <img
                        src="https://p0.meituan.net/travelcube/7289ad16274ae18417b84c916bb6a711169.png"
                        alt="搜索"
                      />
                    </span>
                  </div>
                ) : null}
                {share ? (
                  <div onClick={this.showShare}>
                    <span>
                      <img
                        src="https://cdn.jsdelivr.net/gh/2662419405/imgs/tu/shareimg.png"
                        alt="分享"
                      />
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
          <div
            className={styles.navDropDown}
            style={{ display: this.state.show ? 'block' : 'none' }}
          >
            <ul>
              {data.data.map((v, i) => {
                return (
                  <li key={i}>
                    <Link to={v.url}>
                      <img src={v.img} alt={v.title} />
                      <em></em>
                      {v.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </header>
      </Fragment>
    );
  }
}
