import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import styles from './index.less';

export default class index extends Component {
  render() {
    return (
      <div>
        <Header title="搜索结果" />
        <div className={styles.contentS}>
          <span>你搜索的结果为: {this.props.match.params.id}</span>
          <h2>此页面还在开发中,尽情期待</h2>
        </div>
        <Footer />
      </div>
    );
  }
}
