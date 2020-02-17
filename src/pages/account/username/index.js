import React, { Component, Fragment } from 'react';
import Header from '../../header/index';
import { Button, message } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
import IsOK from '../../../../utils/userName';

@connect(
  state => {
    return {
      isLogin: state.user.isLogin,
      userinfo: state.user.userinfo,
    };
  },
  {
    changeUserInfo: value => ({
      type: 'user/changeName',
      value,
    }),
  },
)
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      name: '',
    };
  }

  getColor = value => {
    this.setState({
      show: value,
    });
  };

  changeUserName = () => {
    if (this.state.name.length > 0 && IsOK(this.state.name)) {
      this.props.changeUserInfo({ name: this.state.name, phone: this.props.userinfo.phone });
    } else {
      message.error('用户名不符合要求,请重新填写');
    }
  };

  changeValueHandler = e => {
    this.setState({
      name: e.target.value,
    });
  };

  render() {
    const { userinfo } = this.props;
    const { show, name } = this.state;
    return (
      <Fragment>
        {userinfo === null ? (
          <div>1</div>
        ) : (
          <Fragment>
            <Header title="修改用户名" account={false} />
            <dl className={styles.list}>
              <dd>
                <input
                  onBlur={() => this.getColor(false)}
                  onFocus={() => this.getColor(true)}
                  type="text"
                  placeholder={userinfo.name}
                  value={name}
                  onChange={this.changeValueHandler}
                  className={show ? styles.show : ''}
                />
              </dd>
            </dl>
            <p className={styles.btnWapper}>
              以英文字母或汉字开头，限4-16个字符，一个汉字为2个字符
            </p>
            <div className={styles.btnWapper}>
              <Button onClick={this.changeUserName} type="primary" className={styles.btnNomare}>
                修改
              </Button>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default index;
