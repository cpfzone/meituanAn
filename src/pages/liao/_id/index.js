import React, { Component } from 'react';
import Header from '../../header';
import { InputItem } from 'antd-mobile';
import styles from './index.less';
import { connect } from 'dva';

import io from 'socket.io-client';
const socket = io(`ws://localhost:4001`);

export default
@connect(
  state => {
    return {
      userinfo: state.user.userinfo,
    };
  },
  {
    submitChatMessage: value => ({
      type: 'chat/submitMessage',
      value,
    }),
    getMessageList: data => ({
      type: 'chat/getMessage',
      data,
    }),
  },
)
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      xian: false,
      index: 0,
      messageList: [],
    };
  }

  componentDidMount() {
    socket.on('recvmsg', data => {
      this.setState({
        messageList: [...this.state.messageList, data],
      });
    });
  }

  showBottomList = index => {
    this.setState({
      index,
      xian: true,
    });
  };

  handleSubmit = () => {
    if (this.state.value === '') {
      return false;
    }
    // 发送到后台的数据
    this.props.submitChatMessage({
      value: this.state.value,
      from: this.props.userinfo._id,
      to: this.props.match.params.id,
    });
  };

  render() {
    const { xian, value, messageList } = this.state;
    return (
      <div>
        <Header title={this.props.match.params.name} rightShow={true} />
        <div className={styles.chat_message}></div>
        <div className={styles.stick_footer}>
          <InputItem
            onKeyUp={e => {
              if (e.keyCode === 13) {
                this.handleSubmit();
              }
            }}
            ref={el => (this.inputRef = el)}
            placeholder="请输入聊天内容"
            value={value}
            onChange={v =>
              this.setState({
                value: v,
              })
            }
            extra={
              <div>
                <span onClick={this.handleSubmit}>发送</span>
              </div>
            }
          ></InputItem>
          <div className={styles.bottomListUI}>
            <ul>
              <li onClick={() => this.showBottomList(1)}>
                <span className="iconfont icon-yuyin"></span>
              </li>
              <li onClick={() => this.showBottomList(2)}>
                <span className="iconfont icon-picture"></span>
              </li>
              <li onClick={() => this.showBottomList(3)}>
                <span className="iconfont icon-biaoqing-xue"></span>
              </li>
              <li onClick={() => this.showBottomList(4)}>
                <span className="iconfont icon-wenjian"></span>
              </li>
              <li onClick={() => this.showBottomList(5)}>
                <span className="iconfont icon-add-sy"></span>
              </li>
            </ul>
            <div className={[styles.bottomDivContent, xian ? styles.zhanshi : null].join(' ')}>
              123
            </div>
          </div>
        </div>
      </div>
    );
  }
}
