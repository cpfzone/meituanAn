import React, { Component, Fragment } from 'react';
import Header from '../../header';
import { Carousel, Skeleton, Comment, Avatar, Form, Button, Input } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
import format from '../../../../utils/time';
import { Modal } from 'antd-mobile';
import route from 'umi/router';
import changeTimeFormat from '../../../../utils/time';

const { TextArea } = Input;
const alert = Modal.alert;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} placeholder="你的意见使我们的动力" />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        提交评论
      </Button>
    </Form.Item>
  </div>
);

export default
@connect(
  state => {
    return {
      id: state.user.userinfo,
      detailListHot: state.list.detailListHot,
      isLogin: state.user.isLogin,
      add: state.hot.add,
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
    zengjiaDianZan: id => ({
      type: 'hot/zan',
      id,
    }),
    destoryHotData: () => ({
      type: 'hot/quxiaoZan',
    }),
    changePingLun: data => ({
      type: 'hot/ping',
      data,
    }),
  },
)
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: false,
      ping: true,
      submitting: false,
      value: '',
      commons: [],
    };
  }
  componentDidMount() {
    this.props.getHotDetailData(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.destoryDetailHot();
    this.props.destoryHotData();
  }

  // 点赞和评论
  changeAdds = (add, id) => {
    if (!this.props.isLogin) {
      this.changeCheckMore();
      return false;
    }
    // 追加点赞
    if (add == 'add') {
      this.props.zengjiaDianZan({ id, item: this.props.match.params.id });
    } else {
      // 追加评论
      document.documentElement.scrollTop = this.refs.rich.offsetTop;
    }
  };

  // 提交评论信息
  handleSubmit = data => {
    if (this.state.value.length === 0) {
      return false;
    }
    data.time = new Date().getTime();
    data.zan = 0;
    data.value = this.state.value;
    data.item = this.props.match.params.id;
    // 提交到数据库
    this.props.changePingLun(data);
    // 页面追加出来
    this.setState({
      commons: [...this.state.commons, data],
      value: '',
    });
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  changeCheckMore = () => {
    // 提示用户进行登录
    alert('', '是否进行登录,获取更多功能', [
      {
        text: '取消',
        onPress: () =>
          this.setState({
            detail: true,
          }),
      },
      {
        text: '登录',
        onPress: () => route.push('/login'),
      },
    ]);
  };

  render() {
    const { detailListHot, isLogin, id, add } = this.props;
    const { ping, submitting, value, commons } = this.state;
    const tou = id && id.avatar;
    const name = id && id.name;
    const userId = id && id._id;
    const allComments = commons.concat(detailListHot.speaks).splice(0, 5);
    const shiFouZan = add && add.n >= 1 ? true : false;
    return (
      <div>
        <Header title="热门模块" rightShow={true} share={true}></Header>
        {detailListHot.imgUrls === undefined ? (
          // 骨架屏位置
          <div className={styles.blackDemo}>
            <div className={styles.guAvatar}></div>
            <Skeleton className={styles.chaju} active paragraph={{ rows: 1, width: '100%' }} />
            <Skeleton
              className={styles.chaju}
              active
              paragraph={{ rows: 5, width: '100%' }}
              title={false}
            />
          </div>
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
                <div
                  style={{ height: !isLogin && !this.state.detail ? '254px' : null }}
                  dangerouslySetInnerHTML={{ __html: detailListHot.textArea }}
                ></div>
                {!isLogin && !this.state.detail ? (
                  <div className={styles.checkMore}>
                    <div className={styles.checkBtn} onClick={this.changeCheckMore}>
                      展开阅读全文
                      <span className="iconfont icon-down-arrow"></span>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className={styles.operation_block}>
              <ul>
                <li onClick={() => this.changeAdds('add', userId)}>
                  {shiFouZan ? (
                    <span className="iconfont icon-01" style={{ color: '#f66262' }}></span>
                  ) : (
                    <span className="iconfont icon-xin"></span>
                  )}
                  <strong>
                    {shiFouZan ? detailListHot.adds.length + 1 : detailListHot.adds.length}
                  </strong>
                </li>
                <li onClick={() => this.changeAdds('speak', userId)}>
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
              <h3 className={styles.top} ref="rich">
                <i className={styles.remain}></i>
                <span className={styles.brief}>笔记评论</span>
              </h3>
              {ping && isLogin ? (
                <div>
                  <Comment
                    avatar={<Avatar src={tou} alt="Han Solo" />}
                    content={
                      <Editor
                        onChange={this.handleChange}
                        onSubmit={() => this.handleSubmit({ avatar: tou, id: userId, name })}
                        submitting={submitting}
                        value={value}
                      />
                    }
                  />
                </div>
              ) : null}
              {allComments.length > 0 ? (
                <div className={styles.commonsPing}>
                  {allComments.map((v, i) => {
                    return (
                      <div key={i} className={styles.commonsNei}>
                        <div className={styles.comment_info_dian}>
                          <div className={styles.comment_user}>
                            <div className={styles.comment_fa_avatar}>
                              <div className={styles.comment_avatar}>
                                <img src={v.avatar} alt="头像" />
                              </div>
                            </div>
                            <div className={styles.comment_stats}>
                              <h4>{v.name}</h4>
                              <span>{changeTimeFormat(v.time)}</span>
                            </div>
                          </div>
                          <div className={styles.dianzanhuifu}>
                            <span className={styles.dianzan}>
                              <svg
                                t="1583219596559"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="3407"
                                width="200"
                                height="200"
                              >
                                <path
                                  d="M931.84 334.54c-39.936-10.444-133.837-10.24-271.258-13.926 6.554-30.003 7.988-57.036 7.988-104.96C668.672 100.966 585.114 0 511.18 0c-52.223 0-95.231 42.7-95.846 95.13-0.716 64.307-20.48 175.41-127.795 231.833-7.885 4.096-30.31 15.155-33.587 16.691l1.638 1.434a101.376 101.376 0 0 0-63.897-25.6H95.846A95.949 95.949 0 0 0 0 415.334V926.72c0 52.838 43.008 95.846 95.846 95.846h95.847a94.72 94.72 0 0 0 85.299-55.193l1.434 0.41 7.68 2.047c0.512 0 0.819 0.103 1.433 0.308 18.432 4.608 53.863 13.004 129.536 30.412 16.384 3.687 101.99 22.016 190.874 22.016h174.694c53.248 0 92.672-19.865 114.381-61.644 21.3-37.07 125.542-236.032 125.44-516.506 0-40.346-27.955-91.853-90.624-109.773zM223.642 926.72c0 17.613-14.336 31.949-31.95 31.949H95.847a31.949 31.949 0 0 1-31.948-31.949V415.334c0-17.612 14.336-31.948 31.948-31.948h95.847c17.715 0 31.949 14.336 31.949 31.948V926.72zM957.85 464.486c-13.312 321.024-117.146 466.33-117.146 466.33-9.728 17.408-25.19 27.853-58.163 27.853H607.949c-87.757 0-174.797-19.866-177.05-20.48-132.71-30.515-139.673-32.87-147.968-35.226l4.608-469.504c0-48.537 1.024-36.25 0-35.635C433.562 337.408 478.003 204.8 479.232 95.949A32.051 32.051 0 0 1 511.181 64c33.792 0 93.491 67.789 93.491 151.757 0 75.776-3.072 88.78-29.594 167.731 319.488 0 317.338 4.608 345.498 11.98 35.02 10.036 37.888 38.913 37.888 48.948 0 10.957-0.205 9.42-0.614 20.07z"
                                  fill="#707070"
                                  p-id="3408"
                                ></path>
                              </svg>
                              .
                            </span>
                            <span className={styles.huifu}>回复</span>
                          </div>
                        </div>
                        <p className={styles.commonsContentNei}>{v.value}</p>
                      </div>
                    );
                  })}
                  {allComments.length == 5 && (
                    <div className={styles.bottomPingLun}>
                      <div className={styles.bottomCheckAll}>
                        <span className={styles.bottomCheckAllBtn}>点击展开更多评论信息</span>
                      </div>
                    </div>
                  )}
                </div>
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
