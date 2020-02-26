import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import Header from '../header/index';
import Footer from '../footer/index';
import styles from './index.less';
import { Carousel } from 'antd-mobile';
import { Button } from 'antd';
import Link from 'umi/link';
import { Rate } from 'antd';
import router from 'umi/router';
import ReturnTop from '../../components/returnTop';

export default
@connect(
  state => {
    return {
      arr: state.list.arr,
    };
  },
  {
    getList: () => ({
      type: 'list/getList', //aciton的type需要加上命名空间
    }),
  },
)
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      gu: false,
    };
  }

  getWindowsTop = () => {
    let scrollTop =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 305) {
      this.setState({
        gu: true,
      });
    }
    if (scrollTop < 305) {
      this.setState({
        gu: false,
      });
    }
  };

  // 防抖
  fang(fn) {
    this.timer = null;
    return () => {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, 200);
    };
  }

  componentDidMount() {
    this.props.getList();
    window.addEventListener('scroll', this.fang(this.getWindowsTop));
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    window.removeEventListener('scroll', this.getWindowsTop());
    console.log(this.fang());
  }

  render() {
    let { arr } = this.props;
    let dIndex = this.props.match.params.index;
    // 过滤掉已经显示的
    arr.filter((v, i) => {
      v.show = i == dIndex ? 'fou' : 'dui';
    });
    let detailArr = {};
    arr.forEach((v, i) => {
      if (this.props.match.params.index == i) {
        detailArr = v;
      }
    });
    // 计算总价
    let num = 0;
    if (detailArr.tuans) {
      detailArr.tuans.forEach(v => {
        num += v.num * v.price;
      });
    }
    return (
      <Fragment>
        <Header title="团购信息" share={true} />
        {detailArr.imgUrls === undefined ? (
          // 骨架屏位置
          <div>加载中</div>
        ) : (
          <div className={styles.groupInfo}>
            <div className={styles.demoCarous}>
              <Carousel
                autoplay={false}
                dots={false}
                className={styles.Carousel}
                afterChange={index => this.setState({ index })}
              >
                {detailArr.imgUrls.length > 0 &&
                  detailArr.imgUrls.map((val, i) => (
                    <img
                      key={i}
                      src={val.url}
                      alt=""
                      style={{ width: '100%', verticalAlign: 'top' }}
                    />
                  ))}
              </Carousel>
              <div className={styles.count}>
                <h3 className={styles.detailName}>{detailArr.name}</h3>
                <p className={styles.detailSup}>{detailArr.sup}</p>
              </div>
              <div className={styles.swiperPage}>
                <strong className={styles.strongPage}>{this.state.index + 1}</strong>/
                {detailArr.imgUrls.length}
              </div>
            </div>
            <div className={styles.cost}>
              <div className={this.state.gu ? styles.guding : null}>
                <div className={styles.buy}>
                  <div className={styles.price}>¥</div>
                  <div className={styles.sumPrice}>{detailArr.new}</div>
                  <div className={styles.past}>
                    <span>门市价¥{detailArr.old}</span>
                  </div>
                  <div className={styles.last}>
                    <Button
                      type="primary"
                      onClick={() =>
                        router.push(`/order/${detailArr._id}/${this.props.match.params.index}`)
                      }
                    >
                      立即抢购
                    </Button>
                  </div>
                </div>
              </div>
              <ul className={styles.advantage}>
                <li>
                  <span
                    style={{ color: detailArr.guo == 'false' ? '#666' : null }}
                    className="iconfont icon-tuikuan"
                  ></span>
                  <p style={{ color: detailArr.sui == 'false' ? '#666' : null }}>
                    {detailArr.sui == 'false' ? '不支持随时退款' : '支持随时退款'}
                  </p>
                </li>
                <li>
                  <span
                    style={{ color: detailArr.guo == 'false' ? '#666' : null }}
                    className="iconfont icon-tuikuan"
                  ></span>
                  <p style={{ color: detailArr.guo == 'false' ? '#666' : null }}>
                    {detailArr.guo == 'false' ? '不支持过期自动退' : '支持过期自动退'}
                  </p>
                </li>
                <li className={styles.gaiLi}>
                  <span className="iconfont icon-ren"></span>
                  90天消费 {detailArr.num}
                </li>
              </ul>
            </div>
            <div className={styles.jiange}></div>
            <div className={styles.detailInfo}>
              <Link className={styles.detailChao} to={{ pathname: '/deal/' + detailArr._id }}>
                <div className={styles.hd}>
                  适用商户({detailArr.xiangqings.length})<p className={styles.arrowRight}></p>
                </div>
                <div className={styles.shopList}>
                  <div className={styles.mbLine}>
                    {detailArr.xiangqings.map((v, i) => {
                      return (
                        <div className={styles.flexBox} key={i}>
                          <aside className={styles.ceshi}>
                            <h3>{v.name}</h3>
                            <div>
                              <Rate disabled defaultValue={v.ping} />
                            </div>
                          </aside>
                          <div className={styles.callLink}>
                            <span className="iconfont icon-dadianhua"></span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className={styles.colList}>
                    <span className="iconfont icon-dingwei"></span>
                    {detailArr.quanAddress}
                  </div>
                </div>
              </Link>
            </div>
            <div className={styles.jiange}></div>
            <div className={styles.tit}>
              团购详情
              <span className="iconfont icon-dingdan"></span>
            </div>
            <div className={styles.detailContent}>
              <table width="100%" cellPadding="0" cellSpacing="0" className={styles.detailTable}>
                <thead>
                  <tr>
                    <th width="50%">名称</th>
                    <th width="25%">数量</th>
                    <th width="25%">价值</th>
                  </tr>
                </thead>
                <tbody>
                  {detailArr.tuans.map((v, i) => {
                    return (
                      <tr key={i}>
                        <td>{v.name}</td>
                        <td className={styles.tc}>{v.num}份</td>
                        <td className={styles.tc}>{v.price}元</td>
                      </tr>
                    );
                  })}
                  <tr className={styles.total}>
                    <td></td>
                    <td className={styles.tc}>
                      <del>总价</del>
                      <br />
                      <span className={styles.changeColor}>团购价</span>
                    </td>
                    <td className={styles.tc}>
                      <del>{num}元</del>
                      <br />
                      <span className={styles.changeColor}>{detailArr.sub}元</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div dangerouslySetInnerHTML={{ __html: detailArr.tain }}></div>
            </div>
            <div className={styles.jiange}></div>
            <div className={styles.tit}>
              购买须知
              <span className="iconfont icon-xinbaniconshangchuan-"></span>
            </div>
            <div className={styles.bugKonw}>
              <dl>
                <dt>有效期</dt>
                <p>{detailArr.youxiao}</p>
              </dl>
              <dl>
                <dt>预约信息</dt>
                <p>{detailArr.yuyue}</p>
              </dl>
              <dl>
                <dt>规则提醒</dt>
                <p>{detailArr.tixing}</p>
              </dl>
              <dl>
                <dt>温馨提示</dt>
                <p>{detailArr.tishi}</p>
              </dl>
            </div>
            <div className={styles.jiange}></div>
            <div className={styles.tit}>网友评论</div>
            <div className={styles.jiange}></div>
            <div className={styles.tit}>
              <h3>相关网购推荐</h3>
            </div>
            <div className={styles.con}>
              {arr &&
                arr.map((v, i) => {
                  return (
                    <Link
                      key={i}
                      to={'/detail/' + v._id + '/' + i}
                      style={{ display: v.show === 'dui' ? 'block' : 'none' }}
                    >
                      <div className={styles.groupTitle}>
                        <span className={styles.tit}>{v.name}</span>
                      </div>
                      <div className={styles.group}>
                        <div className={styles.price}>￥</div>
                        <div className={styles.big}>{v.new}</div>
                        <div className={styles.oPrice}>门市价￥{v.old}</div>
                        <div className={styles.sold}>90天消费{v.num}</div>
                      </div>
                    </Link>
                  );
                })}
            </div>
            <div className={styles.jiange}></div>
          </div>
        )}
        {/* <ReturnTop /> */}
        <Footer />
      </Fragment>
    );
  }
}
