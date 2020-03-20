import React, { Component } from 'react';
import styles from './index.less';
import Link from 'umi/link';
import { Button } from 'antd-mobile';
import { connect } from 'dva';

@connect(null, {
  getCode: value => ({
    type: 'user/getCode',
    value,
  }),
  propsLoginDemo: value => ({
    type: 'user/code',
    value,
  }),
  propsMiMaLogin: value => ({
    type: 'user/password',
    value,
  }),
})
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tel: '',
      firstTip: '',
      firstTime: 0,
      code: '',
      next: true,
      nextPlus: true,
      show: false,
      password: '',
    };
  }

  changeInputValue = e => {
    this.setState({
      tel: e.target.value,
    });
  };

  changeCodeValue = e => {
    const value = this.state.tel;
    this.setState(
      {
        code: e.target.value,
      },
      () => {
        if (
          this.state.code.length === 6 &&
          value.length === 11 &&
          /^1[3456789]\d{9}$/.test(value)
        ) {
          this.setState({ next: false });
          // 判断验证码是否和后台的验证码相符合
        } else {
          this.setState({ next: true });
        }
      },
    );
  };

  getCodeClick = () => {
    const value = this.state.tel;
    if (this.state.firstTime !== 0) {
      return false;
    }
    if (value.length === 11 && /^1[3456789]\d{9}$/.test(value)) {
      this.props.getCode(value);
      this.setState(
        {
          firstTip: '',
          firstTime: 60,
        },
        () => {
          this.codeNextTime();
        },
      );
    } else {
      this.setState({
        firstTip: '手机号输入不正确，请重新输入',
      });
    }
  };

  // 验证码更新
  codeNextTime = () => {
    this.timer = setInterval(() => {
      const code = this.state.firstTime;
      if (code !== 0) {
        this.setState({
          firstTime: code - 1,
        });
      } else {
        this.clearCodeYan();
      }
    }, 1000);
  };

  // 修改密码
  changePassword = e => {
    let tel = this.state.tel;
    let value = e.target.value;
    this.setState(
      {
        password: value,
      },
      () => {
        if (value.length > 0 && /^1[3456789]\d{9}$/.test(tel)) {
          this.setState({
            nextPlus: false,
          });
        } else {
          this.setState({
            nextPlus: true,
          });
        }
      },
    );
  };

  componentWillMount = () => {
    this.clearCodeYan();
  };

  // 清除验证码
  clearCodeYan = () => {
    clearInterval(this.timer);
  };

  toggleMiMa = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    const { firstTip, firstTime, next, code, tel, show, password, nextPlus } = this.state;
    const { propsLoginDemo, propsMiMaLogin } = this.props;
    return (
      <div className={styles.nei}>
        <header className={styles.iloginHeader}>
          <div className={styles.logoImgWarpper}>
            <Link to="/">
              <img
                src="https://p0.meituan.net/travelcube/7c71ecc4b44d0e17447076cd23e501cb31967.png"
                alt="logo"
              />
            </Link>
          </div>
        </header>
        <div className={styles.loginSection}>
          <div style={{ display: show ? 'none' : 'block' }} id={styles.iLoginCompContainer}>
            <div className={styles.isDemoLogin}>
              <div className={styles.iLoginCompphonenumwrapper}>
                <div className={styles.country}>
                  <span>中国+86</span>
                  <i className={styles.right_row}></i>
                </div>
                <input
                  type="text"
                  placeholder="请输入手机号"
                  className={styles.phoneNumInput}
                  maxLength={13}
                  value={tel}
                  onChange={this.changeInputValue}
                />
              </div>
              <div className={styles.mtfe}>{firstTip}</div>
              <div className={[styles.iLoginCompphonenumwrapper, styles.margin50].join(' ')}>
                <input
                  type="text"
                  placeholder="请输入手机验证码"
                  className={styles.phoneNumInput}
                  onChange={this.changeCodeValue}
                />
                <div className={styles.demoCode} onClick={this.getCodeClick}>
                  <span>{firstTime === 0 ? '获取验证码' : firstTime + '秒后重新'}</span>
                </div>
              </div>
              <div className={[styles.mtfe, styles.margin50].join(' ')}></div>
              <div>
                <Button
                  onClick={() => propsLoginDemo({ code, tel })}
                  disabled={next}
                  type="primary"
                  className={styles.gaiColor}
                >
                  登录
                </Button>
              </div>
            </div>
            <div className={styles.iloginComp}>未注册的手机号验证后自动创建美团账户</div>
            <div className={styles.changeIcon}>
              <span onClick={this.toggleMiMa}>账号密码登录</span>
            </div>
          </div>
          <div
            className={styles.accountPwLoginContainer}
            style={{ display: show ? 'block' : 'none' }}
          >
            <div className={styles.isDemoLogin}>
              <div className={styles.iLoginCompphonenumwrapper}>
                <div className={styles.country}>
                  <span>中国+86</span>
                  <i className={styles.right_row}></i>
                </div>
                <input
                  type="text"
                  value={tel}
                  placeholder="请输入手机号"
                  className={styles.phoneNumInput}
                  maxLength={13}
                  onChange={this.changeInputValue}
                />
              </div>
              <div className={styles.mtfe}>{firstTip}</div>
              <div className={[styles.iLoginCompphonenumwrapper, styles.margin50].join(' ')}>
                <input
                  type="password"
                  onChange={this.changePassword}
                  placeholder="请填写密码"
                  className={styles.phoneNumInput}
                />
                <div className={styles.demoCode} onClick={this.getCodeClick}>
                  <span>
                    <Link to="/retrievepassword" className={styles.getMiMa}>
                      忘记密码
                    </Link>
                  </span>
                </div>
              </div>
              <div className={[styles.mtfe, styles.margin50].join(' ')}></div>
              <div>
                <Button
                  onClick={() => propsMiMaLogin({ tel, password })}
                  disabled={nextPlus}
                  type="primary"
                  className={styles.gaiColor}
                >
                  登录
                </Button>
              </div>
            </div>
            <div className={styles.changeLoginType}>
              <span className={styles.toggleType} onClick={this.toggleMiMa}>
                短信验证码登录
              </span>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.three_list}>
              <img alt="github" src="https://static.iiter.cn/github.ico" />
            </div>
            <div className={[styles.three_list, styles.bianLan].join(' ')}>
              <span className="iconfont icon-sign_qq"></span>
            </div>
            <div className={[styles.three_list, styles.bianLv,styles.kongMargin].join(' ')}>
              <span className="iconfont icon-weixin"></span>
            </div>
          </div>
        </div>
        <footer className={styles.iloginFooter}>
          <p>
            登录即代表您已经同意
            <br />
            <Link to="/">《美团点评用户服务协议》</Link>
            <Link to="/">《隐私政策》</Link>
          </p>
        </footer>
      </div>
    );
  }
}

export default index;
