import React, { Component } from 'react';
import Header from '../../header';

export default class index extends Component {
  render() {
    return (
      <div>
        <Header title="选择验证方式" more={true} rightShow={true} />
        选择验证方式
      </div>
    );
  }
}
