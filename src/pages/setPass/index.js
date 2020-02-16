import React, { Fragment } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import styles from './index.less';
import { connect } from 'dva';

@connect(
  state => {
    return {
      userinfo: state.user.userinfo,
    };
  },
  {
    setPassWord: values => ({
      type: 'user/setPassWordDemo',
      values,
    }),
  },
)
class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const phone = this.props.userinfo.phone;
        this.props.setPassWord({ password: values.password, phone });
      }
    });
  };

  //确认密码校验一致
  handleCfmPwd(rules, value, callback) {
    let loginpass = this.props.form.getFieldValue('password');
    if (loginpass && loginpass !== value) {
      callback(new Error('两次密码输入不一致'));
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Fragment>
        <header className={styles.headerNav}>
          <span className={styles.setPassWord}>设置密码</span>
        </header>
        <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
          <Form.Item label="请输入密码">
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: '请输入密码' },
                {
                  // eslint-disable-next-line no-useless-escape
                  pattern: /^.*(?=.{8,16})(?=.*\d)(?=.*[a-z|A-Z]{1,})(?=.*[!@#\$%\^&\*\?\(\),\.;:'"<>\{\}\[\]\\/\+-=\|_]).*$/,
                  message: '密码长度为8-16,必须有字母,特殊字符,数字',
                },
              ],
            })(
              <Input.Password
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="请输入密码"
              />,
            )}
          </Form.Item>
          <Form.Item label="再次输入密码">
            {getFieldDecorator('rePassword', {
              rules: [
                { required: true, message: '请在此输入一遍密码' },
                {
                  validator: (rules, value, callback) => {
                    this.handleCfmPwd(rules, value, callback);
                  },
                },
              ],
            })(
              <Input.Password
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="再次输入密码"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.loginFromButton}>
              确定密码
            </Button>
          </Form.Item>
          <p className={styles.tips}>
            备注：密码长度8位及以上，需包含（数字、大写字母、小写字母、特殊字符）其中2种及以上组合
          </p>
        </Form>
      </Fragment>
    );
  }
}

export default Form.create({ name: 'normal_login' })(NormalLoginForm);
