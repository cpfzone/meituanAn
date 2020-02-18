import { Component } from 'react';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';

@connect(
  state => {
    return {
      userinfo: state.user.userinfo,
    };
  },
  {
    getUserInfoData: id => ({
      type: 'user/userInfoData',
      id,
    }),
  },
)
class Layout extends Component {
  constructor(props) {
    super(props);
    if (this.props.userinfo === null && window.localStorage.getItem('meituanToken')) {
      // 初始化用户数据
      this.props.getUserInfoData(JSON.parse(window.localStorage.getItem('userinfo')).yy);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    return this.props.children;
  }
}

export default withRouter(Layout);
