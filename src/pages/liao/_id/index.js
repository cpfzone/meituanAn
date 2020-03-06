import React, { Component } from 'react';
import Header from '../../header';
import { InputItem, List } from 'antd-mobile';
import styles from './index.less';
import { connect } from 'dva';
import { getChatId } from '../../../../utils/userId';

import io from 'socket.io-client';
import { message } from 'antd';
const config = require('../../../../config/db');
const dbPath = config.complete ? '114.115.182.108' : 'localhost';
const socket = io(`ws://${dbPath}:${config.port}`);
const Item = List.Item;

export default
@connect(
  state => {
    return {
      userinfo: state.user.userinfo,
      messageList: state.chat.messageList,
      huo: state.chat.huo,
      tou: state.chat.tou,
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
    getFirstData: data => ({
      type: 'chat/first',
      data,
    }),
    getFriendsAvatar: data => ({
      type: 'chat/friendsAvatar',
      data,
    }),
    getHuo: data => ({
      type: 'chat/getHuo',
    }),
  },
)
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      xian: false,
      bg: 0,
      messageList: [],
      first: true,
      show: false,
      bgColor: [
        'https://cdn.jsdelivr.net/gh/2662419405/imgs/tu/20200306141916.jfif',
        'https://cdn.jsdelivr.net/gh/2662419405/imgs/tu/20200306141753.jpg',
        'https://cdn.jsdelivr.net/gh/2662419405/imgs/tu/20200306141752.jpg',
        'https://cdn.jsdelivr.net/gh/2662419405/imgs/tu/20200306141751.jpg',
      ],
    };
  }

  componentDidMount() {
    socket.on('recvmsg', data => {
      this.setState({
        messageList: [...this.state.messageList, data],
      });
    });
    this.kaiJi();
    // 与加载图片
    this.imgYu(this.state.bgColor);
  }

  imgYu = data => {
    let sum = 0;
    let count = 0;
    // 计算总数
    data.forEach(v => {
      sum += 1;
    });
    // 预加载
    data.forEach(v => {
      let img = new Image();
      img.src = v;
      img.onload = () => {
        count++;
        if (count === sum) {
          this.setState({ show: true });
        }
      };
    });
  };

  // 换背景
  kaiJi = () => {
    this.timer = setInterval(() => {
      let result = this.state.bg;
      if (this.state.bg >= this.state.bgColor.length - 1) {
        result = 0;
      } else {
        result++;
      }
      this.setState({
        bg: result,
      });
    }, 7000);
  };

  showBottomList = index => {
    if (index !== 3) {
      message.error('正在开发中');
    }
    this.setState({
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
    this.setState({
      value: '',
    });
  };

  faDataMessage = () => {
    if (this.props.huo) {
      // 获取好友聊天记录
      this.props.getFirstData({ from: this.props.userinfo._id, to: this.props.match.params.id });
      // 获取好友信息
      this.props.getFriendsAvatar(this.props.match.params.id);
    }
  };

  componentWillUnmount() {
    this.props.getHuo();
    clearInterval(this.timer);
  }

  render() {
    const { xian, value, messageList, bgColor, bg, show } = this.state;
    const myPropsData = this.props.messageList;
    const newData = myPropsData.concat(messageList);
    const { userinfo, tou } = this.props;
    const user = userinfo && userinfo._id;
    // 获取chatid
    userinfo && this.faDataMessage();
    const chatid = getChatId(user, this.props.match.params.id);
    // 判断是否是我的消息
    let chatmsgs = newData.filter(v => v.chatid === chatid).slice(-20);
    return !userinfo ? (
      <div>加载中</div>
    ) : (
      <div className={styles.boxLaShen}>
        <div style={{ display: show ? 'none' : 'block' }} className={styles.loader}></div>
        <div className={styles.rong} style={{ backgroundImage: `url(${bgColor[bg]})` }}></div>
        <Header ding={true} title={this.props.match.params.name} rightShow={true} />
        <div className={styles.chat_message} id="myDivMessage">
          <List>
            {chatmsgs.map((v, i) => {
              return v.from === userinfo._id ? (
                <Item wrap thumb={userinfo.avatar} multipleLine className="mySendMessage" key={i}>
                  <span className="chatMessage">{v.value}</span>
                </Item>
              ) : (
                <Item multipleLine wrap thumb={tou} key={i}>
                  <span className="chatDuiMessage">{v.value}</span>
                </Item>
              );
            })}
          </List>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
