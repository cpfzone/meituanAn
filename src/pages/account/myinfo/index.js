import React, { Component, Fragment } from 'react';
import Header from '../../header/index';
import { Button } from 'antd-mobile';
import { Modal } from 'antd-mobile';
import styles from './index.less';
import Link from 'umi/link';
import { connect } from 'dva';
import router from 'umi/router';

const alert = Modal.alert;

@connect(
  state => {
    return {
      userinfo: state.user.userinfo,
    };
  },
  {
    clearStorge: () => ({
      type: 'user/clearStroge',
    }),
  },
)
class index extends Component {
  // 退出登录
  clearLogin = () => {
    alert('提示', '确定退出美团账户吗?', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          window.localStorage.clear();
          router.push('/');
          this.props.clearStorge();
          window.location.reload();
        },
        style: 'default',
      },
    ]);
  };

  render() {
    const { userinfo } = this.props;
    return (
      <div>
        <Header title="我的账户" more={true} rightShow={true} />
        {userinfo === null ? (
          <div>1</div>
        ) : (
          <Fragment>
            <dl className={styles.list}>
              <dd>
                <Link to="/account/avatar" className={styles.react}>
                  <div className={styles.moreWeak}>
                    <i className={styles.iconText}>
                      <span className="iconfont icon-touxiang"></span>
                    </i>
                    <span>修改用户头像</span>
                  </div>
                </Link>
              </dd>
              <dd>
                <Link to="/account/username" className={styles.react}>
                  <div className={styles.moreWeak}>
                    <i className={styles.iconText}>
                      <span className="iconfont icon-ren"></span>
                    </i>
                    <span>{userinfo.name}</span>
                    <span className={styles.moreAfter}>修改</span>
                  </div>
                </Link>
              </dd>
              <dd>
                <Link to="/account/resetPass" className={styles.react}>
                  <div className={styles.moreWeak}>
                    <i className={styles.iconText}>
                      <span className="iconfont icon-icon-"></span>
                    </i>
                    <span>修改登录密码</span>
                  </div>
                </Link>
              </dd>
              <dd>
                <Link to="/account/phone" className={styles.react}>
                  <div className={styles.moreWeak}>
                    <i className={styles.iconText}>
                      <span className="iconfont icon-shouji"></span>
                    </i>
                    <span>
                      已绑定手机号{userinfo.phone.substr(0, 3) + '****' + userinfo.phone.substr(7)}
                    </span>
                    <span className={styles.moreAfter}>更换</span>
                  </div>
                </Link>
              </dd>
              <dd>
                <Link to="/account/address" className={styles.react}>
                  <div className={styles.moreWeak}>
                    <i className={styles.iconText}>
                      <span className="iconfont icon-shouhuo"></span>
                    </i>
                    <span>收货地址管理</span>
                  </div>
                </Link>
              </dd>
            </dl>
            <div className={styles.btnWarpper}>
              <Button type="warning" onClick={this.clearLogin}>
                退出登录
              </Button>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default index;
