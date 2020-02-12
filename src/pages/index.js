import React, { Component } from 'react';
import styles from './index.less';
import Link from 'umi/link';
import { Carousel, WingBlank } from 'antd-mobile';
import data from '../data/header.json';
import Footer from './footer';
import { connect } from 'dva';

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
  componentDidMount() {
    this.props.getList();
  }

  render() {
    const { arr } = this.props;
    return (
      <div>
        <header className={styles.navbar}>
          <div className={styles.navbarLeft}>
            <Link to="/changeCity" className={styles.react}>
              <span className={styles.cityNav}>
                北京
                <em></em>
                <img
                  src="https://p0.meituan.net/travelcube/45c79a92755b54adc9dc1c4682b123b3201.png"
                  alt="down"
                  className={styles.icn_down}
                />
              </span>
            </Link>
          </div>
          <div className={styles.boxSearch}>
            <Link to="/search">
              <img
                src="https://p0.meituan.net/travelcube/99c29829cf1b85d5cdbc76a1bd0b7329814.png"
                alt="search"
                className={styles.icn_search}
              />
              <span className={styles.singleLine}>请输入商家名、品类或者商圈...</span>
            </Link>
          </div>
          <div className={styles.navbarRight}>
            <Link to="/acount" className={[styles.react, styles.right_nav].join(' ')}>
              <span className={styles.NavBtn}>
                <img
                  src="https://p0.meituan.net/travelcube/641521461179df7cfb88738dd1ea11ec1031.png"
                  className={styles.icn_mine}
                  alt="logo"
                />
              </span>
            </Link>
          </div>
        </header>
        <div className={styles.banner_download}>
          <div className={styles.bannerItem}>
            <img
              className={styles.imgBox}
              src="https://p1.meituan.net/travelcube/7264ce9c25de2e464e3acd996fe8ad362803.png"
              alt="logo"
            />
            <div className={styles.logoTheme}>
              <p className={styles.logoTit}>省钱利器 购物超划算</p>
              <p className={styles.logoDesc}>吃喝玩乐尽在美团</p>
            </div>
          </div>
          <div className={styles.toAppBtn}>
            <span className={styles.callApp}>去APP</span>
          </div>
        </div>
        <div className={styles.listIn}>
          <WingBlank>
            <Carousel
              autoplay={false}
              infinite
              swipeSpeed={5}
              dotStyle={{ position: 'relative', top: '10px' }}
              dotActiveStyle={{
                backgroundColor: '#FE8C00',
                position: 'relative',
                top: '10px',
              }}
            >
              {data.data.map((item, index) => {
                return (
                  <ul key={index} className={styles.contentList}>
                    {item.children.map((v, i) => {
                      return (
                        <li key={i} className={styles.icon}>
                          <Link to={v.url}>
                            <span
                              style={{ background: v.bg }}
                              className={[styles.newIconCircle, 'iconfont', v.icon].join(' ')}
                            ></span>
                            <span className={styles.iconDesc}>{v.text}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                );
              })}
            </Carousel>
          </WingBlank>
        </div>
        <div className={styles.guessLike}>
          <WingBlank>
            <dl className={styles.listInDl} style={{ opacity: arr.length > 0 ? '1' : '0' }}>
              <dd>
                <dl>
                  <dt>猜你喜欢</dt>
                  {arr.map((v, i) => {
                    return (
                      <dd key={i}>
                        <Link to={'/detail/' + v.url} className={styles.react}>
                          <div className={styles.dealcard}>
                            <div className={styles.dealcardImg}>
                              <img src={v.pic} alt="图像" />
                            </div>
                            <div className={styles.dealcardRight}>
                              <div className={styles.singleLine}>{v.title}</div>
                              <div className={styles.title}>{'[' + v.city + ']' + v.content}</div>
                              <div className={styles.price}>
                                <span className={styles.strong}>{v.new}</span>
                                <span className={styles.strongColor}>元</span>
                                <del>{v.old}</del>
                                <span className={styles.lineRight}>已售{v.num}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </dd>
                    );
                  })}
                </dl>
              </dd>
              <dd className={styles.db}>
                <Link to="/all" className={styles.reacts}>
                  <div className={styles.more}>查看全部团购</div>
                </Link>
              </dd>
            </dl>
          </WingBlank>
          <Footer />
        </div>
      </div>
    );
  }
}
