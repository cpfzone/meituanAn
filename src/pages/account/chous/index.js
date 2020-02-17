import React, { Component } from 'react';
import Header from '../../header/index';
import Footer from '../../footer/index';
import NoEveryThing from '../../noEverything/index';

class index extends Component {
  render() {
    return (
      <div>
        <Header title="我的订单" account={false} />
        <NoEveryThing title="您还没有任何抽奖单，赶紧去参与吧" />
        <Footer />
      </div>
    );
  }
}

export default index;
