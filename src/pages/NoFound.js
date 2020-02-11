import React from 'react';
import Link from 'umi/link';
import styles from './No.less';

export default () => {
  return (
    <div className={styles.pgUnknow}>
      <Link to="/" className={styles.btn}>
        返回美团首页
      </Link>
    </div>
  );
};
