import React, { Component } from 'react';
import styles from './index.less';

export default class returnTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top: false,
    };
  }

  getWindowsTop = () => {
    let scrollTop =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 305) {
      this.setState({
        top: true,
      });
    }
    if (scrollTop < 305) {
      this.setState({
        top: false,
      });
    }
  };

  // 防抖
  fang(fn) {
    var timer = null;
    return function() {
      clearInterval(timer);
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, 200);
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.fang(this.getWindowsTop));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.fang(this.getWindowsTop));
  }

  returnTopClick = () => {
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <div className={[styles.topBtn, this.state.top ? styles.topBegin : null].join(' ')}>
        <span onClick={this.returnTopClick}></span>
      </div>
    );
  }
}
