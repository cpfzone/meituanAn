import React, { Component } from 'react';
import Header from '../../header';
import { SearchBar, WhiteSpace, List } from 'antd-mobile';
import { Icon } from 'antd';

const Item = List.Item;
const Brief = Item.Brief;

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      show: true,
    };
  }

  onChange = value => {
    this.setState({ value });
  };
  clear = () => {
    this.setState({ value: '' });
  };

  render() {
    const { value, show } = this.state;
    return (
      <div>
        <Header title="加好友" rightShow={true} />
        <SearchBar
          onSubmit={() => console.log(value)}
          onClear={this.clear}
          onChange={this.onChange}
          placeholder="目前只限输入对方手机号"
          maxLength={11}
          onFocus={() =>
            this.setState({
              show: false,
            })
          }
          onBlur={() =>
            this.setState({
              show: true,
            })
          }
        />
        <WhiteSpace />
        {show ? (
          <div>
            <List renderHeader={() => '下列功能均在开发中'}>
              <Item thumb={<Icon type="scan" />} arrow="horizontal">
                扫一扫添加好友
              </Item>
              <Item arrow="horizontal" thumb={<Icon type="user-add" />}>
                添加附近的好友
              </Item>
              <Item arrow="horizontal" thumb={<Icon type="tag" />}>
                通过标签添加好友
              </Item>
            </List>
          </div>
        ) : (
          <div>搜素到的列表数据</div>
        )}
      </div>
    );
  }
}
