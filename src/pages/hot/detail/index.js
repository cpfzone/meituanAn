import React, { Component, Fragment } from 'react';
import Header from '../../header';
import { Carousel } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
import format from '../../../../utils/time';

export default
@connect(
  state => {
    return {
      detailListHot: state.list.detailListHot,
    };
  },
  {
    getHotDetailData: id => ({
      type: 'list/getHotDetailData',
      id,
    }),
    destoryDetailHot: () => ({
      type: 'list/hotDesotryData',
    }),
  },
)
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getHotDetailData(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.destoryDetailHot();
  }

  render() {
    const { detailListHot } = this.props;
    return (
      <div>
        <Header title="热门模块" rightShow={true} share={true}></Header>
        {detailListHot.imgUrls === undefined ? (
          // 骨架屏位置
          <div>加载中</div>
        ) : (
          <Fragment>
            <div className={styles.zuoyouHot}>
              <Carousel
                autoplay
                easing="linear"
                className={styles.Carousel}
                afterChange={index => this.setState({ index })}
              >
                {detailListHot.imgUrls.length > 0 &&
                  detailListHot.imgUrls.map((val, i) => (
                    <img
                      key={i}
                      src={val.url}
                      alt=""
                      style={{ width: '355px', verticalAlign: 'top' }}
                    />
                  ))}
              </Carousel>
            </div>
            <div className={styles.authorSection}>
              <div className={styles.author}>
                <div className={styles.author_info}>
                  <div className={styles.author_avatar}>
                    <div className={styles.author_avatar_img}>
                      <img src={detailListHot.avatar} alt="头像" />
                    </div>
                  </div>
                  <h3 className={styles.nickName}>
                    <span>{detailListHot.name}</span>
                    <img
                      className={styles.levelDeng}
                      src="http://s4.xiaohongshu.com/static/throne/11f_05e45936bee244cb9fafd4768b8f6810.png"
                      alt="小logo"
                    />
                  </h3>
                </div>
                <div className={styles.author_btn}>关注</div>
              </div>
            </div>
            <div className={styles.node}>
              <h1 className={styles.hotTitle}>{detailListHot.title}</h1>
              <div className={styles.contentHot}>
                <div dangerouslySetInnerHTML={{ __html: detailListHot.textArea }}></div>
              </div>
            </div>
            <div className={styles.operation_block}>
              <ul>
                <li>
                  <span className="iconfont icon-xin"></span>
                  <strong>{detailListHot.adds.length}</strong>
                </li>
                <li>
                  <span className="iconfont icon-pinglun"></span>
                  <strong>{detailListHot.speaks.length}</strong>
                </li>
                <li>
                  <span className="iconfont icon-shoucang1"></span>
                  <strong>0</strong>
                </li>
              </ul>
            </div>
            <div className={styles.updateTime}>{format(detailListHot.createTime)}</div>
            <div className={styles.kongxi}></div>
            <div className={styles.allTip}>
              <h3 className={styles.top}>
                <i className={styles.remain}></i>
                <span className={styles.brief}>笔记评论</span>
              </h3>
              {detailListHot.speaks.length > 0 ? (
                <div>评论区</div>
              ) : (
                <div className={styles.nocoment}>
                  <img
                    src="//s.xiaohongshu.com/formula-static/frieza/public/img/elephant.207c437.png"
                    alt="头像"
                    className={styles.smallpic}
                  />
                  <h3 className={styles.remain}>啊欧，还没有评论哦～</h3>
                </div>
              )}
            </div>
            <div className={styles.kongxi}>
              <div className={styles.allTip}>
                <h3 className={styles.top}>
                  <i className={styles.remain}></i>
                  <span className={styles.brief}>相关推荐</span>
                </h3>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}
