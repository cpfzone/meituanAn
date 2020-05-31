import { Component } from 'react';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import { Modal } from 'antd-mobile';

const alert = Modal.alert;

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
    changeCity: name => ({
      type: 'user/citySouHu',
      name,
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

  componentDidMount() {
    // const cityName = window.returnCitySN ? window.returnCitySN['cname'] : '定位失败';
    const cityName = '定位失败';
    alert('', '你当前的城市:' + cityName, [
      { text: '否' },
      { text: '是', onPress: () => this.props.changeCity(cityName) },
    ]);
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(Layout);
