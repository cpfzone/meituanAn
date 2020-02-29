import React, { Component, Fragment } from 'react';
import Header from '../../header';
import { Carousel } from 'antd';
import styles from './index.less';
import { connect } from 'dva';

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
          </Fragment>
        )}
      </div>
    );
  }
}
