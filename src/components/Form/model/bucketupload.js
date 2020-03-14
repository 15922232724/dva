import React,{Component} from 'react';
import { Button } from 'antd';
import OSS from 'ali-oss';
import Upload from '../../Upload';
import $$ from 'cmn-utils';
import qs from 'qs';
import {Net} from '@/utils/request'
import _ from 'lodash'
const bucketPathBase = 'file-bucket';
const dbFilePathBase = 'db-file';
const filePathBase = 'file';

/**
 * Upload元件, 可能需要自已处理反回值，如果后台需要FormData
 * bucketId或buckeName 必填一项
 * const formData = new FormData();
   fileList.forEach((file) => {
     formData.append('files[]', file);
   });
 */
class BucketUpload extends Component {
  constructor(props) {
    super(props);
    let client;
    this.state = {
      // 存储位置 “DB” / “ALIYUN_OSS”
      storageLocation:'',
      // 三方存储空间名称
      tripleBucket:'',
      // 三方存储空间AccessKey
      tripleBucketAccessKeyId:'',
      tripleBucketAccessKey:'',
      // 三方存储空间SecretKey
      tripleBucketSecretKey:'',
      // 三方存储空间地址
      tripleBucketUrl:'',
      region:'',
      loading:false,
      fileList:[]
    };
  }
  componentDidMount() {
    if(!this.props.bucketName && !this.props.bucketId){
      console.error('bucketName或bucketId必须设置一项！')
      return
    }
    this.setState({
      loading:true,
    })
    let dataPromise = this.onLoadData();
    dataPromise.then(data=>{
      let {storageLocation,tripleBucket,tripleBucketAccessKey,tripleBucketSecretKey,
        tripleBucketUrl,tripleBucketAccessKeyId,region} = data;
      this.setState({
        // 存储位置 “DB” / “ALIYUN_OSS”
        storageLocation,
        // 三方存储空间名称
        tripleBucket,
        // 三方存储空间AccessKey
        tripleBucketAccessKey,
        // 三方存储空间SecretKey
        tripleBucketSecretKey,
        // 三方存储空间地址
        tripleBucketUrl,
        tripleBucketAccessKeyId,
        region
      })
      if(storageLocation==='ALIYUN_OSS'){
        this.client = new OSS({
          region: region,
          accessKeyId: tripleBucketAccessKeyId,
          accessKeySecret: tripleBucketAccessKey,
          bucket: tripleBucket
        });
      }
    }).finally(() => {
      this.setState({
        loading:false,
      })
    })
  }
  customRequest = ({file, data, onSuccess, onError}) => {
    // 使用aliOss SDK 上传
     this.client.multipartUpload(`${file.uid}_${file.name}`, file).then((data)=>{
       const {res} = data;
       if(res.status === 200){
       // 上传成功会响应至组件的onChange方法中
         onSuccess({
          fileName:file.name,
          id:`${file.uid}_${file.name}`,
         })
       }
     }).catch(onError)
   }
 
  onChange =(values)=>{
    {
      const {file} = values;
      const {status} = file;
      // 上传完成
      if(!status){
        return;
      }
      if(status ==='done'){
        const {response} = file;
        const body = {
          name:response.fileName,
          fileId:response.id,
          fileBucket:{
            id:this.props.bucketId,
            name:this.props.bucketName,
          }
         }
        const p = Net.post(`/${filePathBase}`, body,{afterResponse:null});
        p.then((data)=>{
          const fileList = this.state.fileList.concat({...data,uid:file.uid})
          this.setState({fileList});
          this.props.onChange(fileList)
        })
      }
      if (status === 'removed'){
        const fileList = this.state.fileList.filter(item=>item.uid!==file.uid)
        this.setState({fileList});
        this.props.onChange(fileList)
      }
    }
  }
 /**
  * 阿里云OSS上传配置
  */
  aliOSSUploadProps = {
    ...this.props.uploadProps,
    // beforeUpload: this.beforeUpload,
    customRequest: this.customRequest,
    dragger:this.props.dragger,
    //支持批量上传
    multiple:true,
    onChange:this.onChange,
  };
  /**
   * 数据库上传配置
   */
  dbUploadProps ={
    ...this.props.uploadProps,
    action:`/${dbFilePathBase}`,
    dragger:this.props.dragger,
    //支持批量上传
    multiple:true,
    onChange:this.onChange,
  }

  /**
   * 加载空间参数
   */
  onLoadData = async name => {
    let query = qs.stringify({
      name:this.props.bucketName,
      id:this.props.bucketId
    })
    let data =  await Net.post(`/${bucketPathBase}/find-by-name-or-id?${query}`, null,{afterResponse:null})
    return data;
  };
  render() {
    let {loading} = this.state;
    let uploadProps= this.state.storageLocation === 'DB' ?  this.dbUploadProps : this.aliOSSUploadProps;
    return(
      <Upload {...uploadProps}>
        <Button
          loading={loading}
          icon={this.props.btnIcon}
          disabled={isDisabled(this.props.max, this.props.form.getFieldValue(this.props.name))}
        >
          点击上传
        </Button>
      </Upload>
    )
  }
}
export default ({
  form,
  name,
  formFieldOptions = {},
  // 存储空间名称
  bucketName,
  bucketId,
  record,
  initialValue,
  normalize,
  rules,
  // onChange,
  type,
  preview,
  renderUpload,
  btnIcon = 'upload',
  max,
  maxFileSize, // 最大文件大小
  fileTypes, // 允许文件类型
  action, // 后台地址
  fileName, // antd upload 的name属性,因为name被formItem使用,上传到后台的文件名
  getPopupContainer,
  // 拖拽模式
  dragger,
  ...otherProps
}) => {
  const { getFieldDecorator } = form;

  let initval = initialValue;

  if (record) {
    initval = record[name];
  }

  // 如果存在初始值
  if (initval !== null && typeof initval !== 'undefined') {
    if ($$.isFunction(normalize)) {
      formFieldOptions.initialValue = normalize(initval);
    } else {
      formFieldOptions.initialValue = initval;
    }
  }

  if (preview) {
    return <div style={otherProps.style}>{initval || ''}</div>;
  }

  // 如果有rules
  if (rules && rules.length) {
    formFieldOptions.rules = rules;
  }

  if (maxFileSize || fileTypes) {
    formFieldOptions.rules = [
      {
        validator: (rule, value, callback) => {
          validatorFileSize(maxFileSize, value, callback);
          validatorFileTypes(fileTypes, value, callback);
          callback();
        }
      },
      ...(formFieldOptions.rules || [])
    ];
  }

  // // 如果需要onChange
  // if (typeof onChange === 'function') {
  //   formFieldOptions.onChange = args => onChange(form, args); // form, args
  // }

  let uploadProps = {
    beforeUpload: file => false,
    btnIcon,
    bucketName,
    bucketId,
    max,
    form,
    name,
    dragger,
    ...otherProps
  };

  // 真接上传到后台
  // if (action) {
  //   uploadProps = otherProps;
  //   uploadProps.action = action;
  //   uploadProps.name = fileName || 'file';
  // }

  return getFieldDecorator(name, {
    valuePropName: 'fileList',
    getValueFromEvent: normFile,
    ...formFieldOptions
  })(
    <BucketUpload {...uploadProps}>
    </BucketUpload>
  );
};

const validatorFileSize = (maxFileSize, value, callback) => {
  if (value.some(item => item.size > maxFileSize * 1024)) {
    callback(new Error(`请上传文件大小在${maxFileSize}K以内的图片`));
    return;
  }
};

const validatorFileTypes = (fileTypes, value, callback) => {
  if ($$.isArray(fileTypes) && fileTypes.length > 0) {
    if (
      value.some(
        item =>
          item.name &&
          !fileTypes.some(
            type => item.name.toLowerCase().indexOf(type.toLowerCase()) !== -1
          )
      )
    ) {
      callback(new Error(`请上传${fileTypes.join('、')}，类型文件`));
      return;
    }
  }
};

// 如果设置max，控制按钮禁用状态
const isDisabled = (max, value) => {
  if (!max) return false;
  if (!value) return false;
  if (value && value.length < max) {
    return false;
  }
  return true;
};

const normFile = e => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};
