import React, { Component } from 'react';
import Header from '../../../header';
import styles from '../index.less';

export default class index extends Component {
  render() {
    return (
      <div>
        <Header title="活动通用规则" more={true} rightShow={true} />
        <div className={styles.dd_container}>
          <p>
            1.每个自然人用户仅限使用一个美团账号来参与活动，请勿重复注册账号参加（同一美团账号、手机号码、移动设备、支付账号信息，以及经过授权获取的身份标识信息，均视为同一用户）；
          </p>
          <p>
            2.活动过程中，如果出现因网络攻击、黑客攻击、数据泄露等原因导致活动无法继续，美团有权利提前终止活动；
          </p>
          <p>
            3.活动过程中，用户不得使用任何外挂、插件以及其他破坏活动规则、违背活动公平原则的方式参加本次活动（如批量注册、恶意购买、虚假分享、倒买倒卖、虚假交易等），用户和商户不得进行有组织的众包作弊行为，否则美团有权取消用户、商户参与活动资格，必要时取消后续参与美团营销活动的权利，并追究法律责任；
          </p>
          <p>4.如有任何问题请与美团客服联系（客服电话10107888）。</p>
        </div>
      </div>
    );
  }
}
