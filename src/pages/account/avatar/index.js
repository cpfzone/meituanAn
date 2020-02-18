import React, { Component } from 'react';
import Header from '../../header';
import { Upload, Icon, message, Button, Modal } from 'antd';
import styles from './index.less';
import { connect } from 'dva';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

@connect(null, {
  uploadfile: file => ({
    type: 'user/fileImg',
    file,
  }),
})
class index extends Component {
  state = {
    loading: false,
    previewVisible: false,
    file: null,
    OSSData: {},
  };

  async componentDidMount() {
    await this.init();
  }

  init = async () => {
    try {
      const OSSData = await this.mockGetOSSData();

      this.setState({
        OSSData,
      });
    } catch (error) {
      message.error(error);
    }
  };

  getExtraData = file => {
    const { OSSData } = this.state;
    console.log(OSSData);
    return {
      key: file.url,
      OSSAccessKeyId: OSSData.accessId,
      policy: OSSData.policy,
      Signature: OSSData.signature,
    };
  };

  mockGetOSSData = () => {
    return {
      dir: 'user-dir/',
      host: '//www.mocky.io/v2/5cc8019d300000980a055e76',
    };
  };

  handleCancel = () => {
    this.setState({
      previewVisible: false,
    });
  };

  updateImg = () => {
    // 上传文件
    this.props.uploadfile(this.state.file);
  };

  showImg = () => {
    if (!this.state.imageUrl) {
      message.error('请上传图片');
    } else {
      this.setState({
        previewVisible: true,
      });
    }
  };

  beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('你只能上传png或者jpg的图片');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片不能超过2mb大小');
    }
    this.setState({
      file,
    });
    return isJpgOrPng && isLt2M;
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl, previewVisible, OSSData } = this.state;
    return (
      <div>
        <Header title="修改头像" />
        <div className={styles.btnWrapper}>
          <span className={styles.changAvatar}>修改用户头像</span>
          <Button onClick={this.showImg} className={styles.floatRight} type="primary">
            预览
          </Button>
        </div>
        <Upload
          name="avatar"
          listType="picture-card"
          className={styles.avatarUploader}
          showUploadList={false}
          action={OSSData.host}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
          data={this.getExtraData}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
        <div className={styles.btnWrapper}>
          <Button onClick={this.updateImg} className={styles.changeEdit} type="primary">
            确定修改
          </Button>
        </div>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={imageUrl} />
        </Modal>
        <span className={styles.tipChange}>你只能上传png或者jpg的图片,并且图片不能超过2mb大小</span>
      </div>
    );
  }
}

export default index;
