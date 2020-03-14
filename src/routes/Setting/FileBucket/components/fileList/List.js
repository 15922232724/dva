import React from 'react';
import { connect } from 'dva';
import { Layout, Button, PageHeader, Col,Modal } from 'antd';
import BaseComponent from 'components/BaseComponent';
// import Toolbar from 'components/Toolbar';
import SearchBar from 'components/SearchBar';
import Icon from 'components/Icon';
import DataTable from 'components/DataTable';
import { ModalForm } from 'components/Modal';
import Zmage from 'react-zmage'
import { Link } from 'dva/router';
import {getFileInfo} from '@/utils/fileUtils'
import * as action from '../../action/Action'
import './List.less';
import _ from 'lodash';
import { antdNotice } from 'components/Notification';
const notice = antdNotice;

const { Content, Header, Footer } = Layout;
const Pagination = DataTable.Pagination;

const pathBase = 'file-bucket';
const namespace = 'fileBucket';
const nameTitle = '文件列表';
const idKey = 'id';

/**
 * 角色列表
 */
@connect(({ fileBucket, loading }) => ({
  fileBucket,
  loading: loading.effects[`${namespace}/getFileList`],
}))
export default class extends BaseComponent {
  state = {
    /**
     * 选中的行
     */
    rows: [],
    record:{},
    visible:false,
    viewFileVisible:false
  };

  componentDidMount() {
    const { dispatch, match:{params}, history: { location: { state } } } = this.props;
    const model = this.props[namespace];
    const filePage = model.filePage;
    // 获取路由中的用户id，并请求次用户数据
    if (params) {
      const id = params.id;
      if(id){
        this.setState({
        record: { id },
      });
        dispatch(action.getFileList(filePage.filter({ bucketId:id })))
      }
    }
  }
fileNameOnClick(record){
      const {dispatch} = this.props;
      this.setState({
        viewFileVisible:true,
        record: {id:record.id}
      })
      dispatch(action.getFile({id:record.id}))
  }
  /**
   * 列
   */
  createColumns(self){
    return [
      {
        title: '文件名称',
        name: 'name',
        tableItem: {
          type:'custom',
          render: (text, record) => {return <a onClick={()=>this.fileNameOnClick(record)}>{text}</a>}
        },
        searchItem: {
          group: 'abc'
        }
      },
      {
          title: '文件ID/HASH',
          name: 'fileId',
          dicttypecode:'STORAGE_LOCATION',
          tableItem: {}
        },
        {
          title: '操作',
          tableItem: {
            width: 180,
            render: (text, record) => (
              <DataTable.Oper>
                <Button tooltip="删除" onClick={e => self.onDelete(record)}>
                  <Icon type="trash" />
                </Button>
              </DataTable.Oper>
            )
          }
        }
      ]
  }
  
  /**
   * 删除处理
   */
  handleDelete = records => {
    const { rows } = this.state;

    this.props.dispatch(action.removeFile({
      records,
      id:this.state.record && this.state.record.id,
      success: () => {
        // 如果操作成功，在已选择的行中，排除删除的行
        this.setState({
          rows: rows.filter(
            item => !records.some(jtem => jtem.rowKey === item.rowKey)
          ),
        });
      }
    }));
  };
  /**
   * 搜索处理
   */
  handleSearch = (values) => {
    const { dispatch } = this.props;
    const {record} = this.state; 
    const model = this.props[namespace];
    const list = model.filePage;
    values = {
      ...values,
      bucketId:record.id
    }
    dispatch(action.getFileList(
      list.filter(values).jumpPage(1, 10)
    ));
  }
  /**
   * 分页改变处理
   */
  handleChange = ({ pageNum, pageSize }) => {
    const { dispatch } = this.props;
    const model = this.props[namespace];
    const list = model.filePage;

    dispatch(action.getFileList(
       list.jumpPage(pageNum, pageSize)
    ));
  }

  render() {
    const { loading, history,dispatch} = this.props;
    const model = this.props[namespace];
    const {filePage,fileData} = model;
    const columns = this.createColumns(this);
    const { rows,visible } = this.state;
    const searchBarProps = {
      columns,
      onSearch: this.handleSearch,
    };
    const modalColumns = (self)=>{    
      return [
        {
          // title: '文件名称',
          name: 'file',
          tableItem: {},
          formItem: {
            col: { span: 24 },
            type:'bucketupload',
            dragger:true,
            bucketId:this.state.record && this.state.record.id,
          }
        }
      ]
      }
      const fileViewModalColumns = (self)=>{    
      return [
        {
          title: '文件名称',
          name: 'name',
          tableItem: {},
          formItem: {
            col: { span: 12 },
          }
        },
        {
          title: '文件类型',
          name: 'fileType',
          tableItem: {},
          formItem: {
            col: { span: 12 },
          }
        },
        {
          title: '浏览|下载',
          name: 'file',
          tableItem: {},
          formItem: {
            col: { span: 24 },
            type:'custom',
            render: (record, form) => {
              const {fileData} = this.props.fileBucket;
              const {fileUrl,fileUrlAuth,fileName}  =  getFileInfo(fileData);
              
              const downList =(
                  <div>
                    <Button type="primary" icon="download" size="small" download={fileName} href={fileUrlAuth}>
                      下载
                    </Button>
                    <span style={{marginLeft:'16px'}} >{fileName}</span>
                  </div>
              )
              const images=(
                <div>
                  {_.indexOf(['jpg','png','gif','jpge'],fileData.fileType) !== -1 
                  && (<Zmage src={fileUrlAuth}/>)}
                </div>
              )
              return [downList,images]
            }, // 当type:custom时，自定义渲染
          }
        },
        {
          title: '空间信息',
          tableItem: {},
          formItem: {
            col: { span: 12 },
            type:'line'
          }
        },
        {
          title: '空间名称',
          name: 'fileBucket.name',
          tableItem: {},
          formItem: {
            col: { span: 12 },
          }
        },
        {
          title: '空间位置',
          name: 'fileBucket.storageLocation',
          dicttypecode:'STORAGE_LOCATION',
          tableItem: {},
          formItem: {
            col: { span: 12 },
            type:'select',
          }
        }
      ]
      }
    //文件上传模态框
    const uploadModalFormProps = {
      loading,
      title:'文件上传',
      visible,
      destroyOnClose:true,
      onSubmitText:'确定',
      columns:modalColumns(this),
      modalOpts: {
        width: 700
      },
      onCancel: () => {
        this.setState({
          visible: false
        });
      },
      // 新增、修改都会进到这个方法中，
      // 可以使用主键或是否有record来区分状态
      onSubmit: value => {
        this.setState({
          visible:false
        });
        dispatch(action.getFileList(filePage.filter({ bucketId:this.state.record && this.state.record.id })))
      }
    };
    //文件查看
    const viewFileModalFormProps = {
      // loading,
      title:'文件查看',
      visible:this.state.viewFileVisible,
      onSubmitText:'确定',
      preview: true,
      record:fileData,
      columns:fileViewModalColumns(this),
      destroyOnClose:true,
      modalOpts: {
        width: 700
      },
      onCancel: () => {
        this.setState({
          viewFileVisible: false
        });
      },
      // 新增、修改都会进到这个方法中，
      // 可以使用主键或是否有record来区分状态
      onSubmit: value => {
        this.setState({
          viewFileVisible:false
        });
      }
    };
    /**
     * 头部工具栏
     */
    const PageToolbar = (
          <PageHeader
          ghost={false}
          title={`${nameTitle}列表`}
          onBack={() => history.goBack()}
          // onBack={() => history.goBack()}
          extra={[
            // onClick={onSubmit}
            <Button.Group key='topbuttons'>
              <Button type="primary" icon="plus" onClick={() => {
                this.setState({visible:true})
              }}>
                文件上传
              </Button>
            </Button.Group>
          ]}
        >
          <Col>
              <SearchBar group="abc"  {...searchBarProps} />
          </Col>
        </PageHeader>
    )
    
    /**
     * List渲染参数
     */
    const dataTableProps = {
      loading:loading,
      columns,
      rowKey: 'id',
      dataItems: filePage,
      bordered:true,
      selectType: 'checkbox',
      showNum: true,
      isScroll: true,
      selectedRowKeys: rows.map(item => item.rowKey),
      onChange: this.handleChange,
      onSelect: (keys, rows) => this.setState({ rows })
    };

    return (
      <Layout className="full-layout user-page">
        <Header>
          {PageToolbar}
        </Header>
        <Content>
          <DataTable {...dataTableProps} />
        </Content>
        <Footer>
          <Pagination {...dataTableProps} />
        </Footer>
        <ModalForm {...uploadModalFormProps} />
        <ModalForm {...viewFileModalFormProps} />
      </Layout>
    );
  }
}
