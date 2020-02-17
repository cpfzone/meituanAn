import React, { Component } from 'react';
import styles from './index.less';

export default class no extends Component {
  render() {
    return (
      <div className={styles.noOrder}>
        <div className={styles.iconLine}>
          <img
            src="https://p0.meituan.net/travelcube/aac254bb1339eedc0ddda76f69cbd20121533.png"
            alt="logo"
          />
        </div>
        <span className={styles.iconDesc}>{this.props.title}</span>
      </div>
    );
  }
}
