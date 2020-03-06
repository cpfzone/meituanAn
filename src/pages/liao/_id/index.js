import React, { Component } from 'react';
import Header from '../../header';
import { InputItem, List } from 'antd-mobile';
import styles from './index.less';
import { connect } from 'dva';
import { getChatId } from '../../../../utils/userId';

import io from 'socket.io-client';
const socket = io(`ws://localhost:4001`);
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
      first: true,
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
    this.setState({
      value: '',
    });
  };

  faDataMessage = () => {
    if (this.props.huo) {
      this.props.getFirstData({ from: this.props.userinfo._id, to: this.props.match.params.id });
      this.props.getFriendsAvatar(this.props.match.params.id);
    }
  };

  render() {
    const { xian, value, messageList } = this.state;
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
        <Header ding={true} title={this.props.match.params.name} rightShow={true} />
        <div className={styles.chat_message} id="myDivMessage">
          <img src={require('@/assets/expression/文小喵/02.gif')} />
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
        </div>
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
