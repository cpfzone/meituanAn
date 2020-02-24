import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import Header from '../header/index';
import Footer from '../footer/index';
import styles from './index.less';
import { Carousel } from 'antd-mobile';
import { Button } from 'antd';
import Link from 'umi/link';
import { Rate } from 'antd';

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
    let { arr } = this.props;
    let detailArr = {};
    arr.forEach((v, i) => {
      if (this.props.match.params.index == i) {
        detailArr = v;
      }
    });
    return (
      <Fragment>
        <Header title="团购信息" share={true} />
        {detailArr.imgUrls === undefined ? (
          // 骨架屏位置
          <div>加载中</div>
        ) : (
          <div className={styles.groupInfo}>
            <div className={styles.demoCarous}>
              <Carousel autoplay={false} dots={false} className={styles.Carousel}>
                {detailArr.imgUrls.length > 0 &&
                  detailArr.imgUrls.map(val => (
                    <img
                      src={val.url}
                      alt=""
                      style={{ width: '100%', verticalAlign: 'top' }}
                      key={val.key}
                    />
                  ))}
              </Carousel>
              <div className={styles.count}>
                <h3 className={styles.detailName}>{detailArr.name}</h3>
                <p className={styles.detailSup}>{detailArr.sup}</p>
              </div>
            </div>
            <div className={styles.cost}>
              <div className={styles.buy}>
                <div className={styles.price}>¥</div>
                <div className={styles.sumPrice}>{detailArr.new}</div>
                <div className={styles.past}>
                  <span>门市价¥{detailArr.old}</span>
                </div>
                <div className={styles.last}>
                  <Button type="primary">立即抢购</Button>
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
          </div>
        )}
        <Footer />
      </Fragment>
    );
  }
}
