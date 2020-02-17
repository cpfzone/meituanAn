import React, { Fragment } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
import Header from '../../header';

@connect(
  state => {
    return {
      userinfo: state.user.userinfo,
    };
  },
  {
    resetPassword: values => ({
      type: 'user/resetPassword',
      values,
    }),
  },
)
class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.salt = this.props.userinfo.salt;
        this.props.resetPassword(values);
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
        <Header title="设置密码" />
        <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
          <Form.Item label="请输入当前密码">
            {getFieldDecorator('yuanPassword', {
              rules: [
                { required: true, message: '请输入当前密码' },
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
                placeholder="请输入当前密码"
              />,
            )}
          </Form.Item>
          <Form.Item label="请输入新密码">
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: '请输入新密码' },
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
                placeholder="请输入新密码"
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
