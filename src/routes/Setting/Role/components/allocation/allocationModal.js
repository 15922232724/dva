import React from 'react';
import { connect } from 'dva';
import { ModalForm } from 'components/Modal';
import { Tag,Row, Col, Table, Modal } from 'antd';
import SearchBar from 'components/SearchBar';
import * as userActions from '@/routes/Setting/User/action/userAction'
import * as roleActions from '@/routes/Setting/Role/action/roleAction'
@connect(({ user, loading }) => ({
  user,
  loading: loading.models.role,
}))
export default class AllocationModal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      selectUsers:[],
    };
  }
  componentDidMount(){
    // const {dispatch} = this.props;
  }
  /**
   * 分页改变处理
   */
  handleChange = ( pageNum, pageSize) => {
    const { user: { pageData }, dispatch } = this.props;
    dispatch(userActions.getList({
      pageData: pageData.jumpPage(pageNum, pageSize)
    }));
  }
  /**
   * select改变处理
   */
  handleSelect = (record, selected, selectedRows, nativeEvent)=>{
    const {selectUsers} = this.state;
    let newSelectUsers;
    if(selected){
      selectUsers.push(record);
      newSelectUsers = selectUsers;
    }else{
      newSelectUsers = selectUsers.filter(user=>user.id !== record.id);
    }
    this.setState({ selectUsers:newSelectUsers });
  }
  /**
   * 关闭tag
   */
  handleCloseTag = (e)=>{
    const {selectUsers} = this.state;
    this.setState({ selectUsers:selectUsers.filter(user=>user.id !== e.id) });
  }
  onSearch = (values, isReset) =>{
    const { user: { pageData }, dispatch } = this.props;
    dispatch(userActions.getList({
      pageData: pageData.filter(values).jumpPage(1, 10)
    }));
  }
  render(){
    const {dispatch,visible,user,onCancel,loading,record} = this.props;
    const {selectUsers} = this.state;
    const {handleCloseTag,onSearch} = this;
    const innerColumns = [
      {
        title: '名称',
        dataIndex: 'firstName',
      },
      {
        title: '登录名',
        dataIndex: 'login',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
      },
      {
        title: '手机',
        dataIndex: 'phone',
      },
      
    ];
    const rowSelection = {
      selectedRowKeys:selectUsers.map(user=>user.id),
      onSelect:this.handleSelect,
    };
    const pagination ={
        ...user.pageData,
        onChange:this.handleChange
    };
    const searchColumns =[
      {
        title: '用户名',
        name: 'firstName',
        searchItem: {}
      }
    ];
    
    const modalFormProps = {
      loading,
      title:'分配新的用户',
      visible,
      type:'grid',
      width: '90vw',
      onCancel: ()=>{
        onCancel();
        this.setState({selectUsers:[]})
      },
      // 新增、修改都会进到这个方法中，
      // 可以使用主键或是否有record来区分状态
      onOk: values => {
        dispatch(roleActions.putRoleUserList(
          { 
            value: selectUsers.map(user=>`${user.id}`),
            id:record.id, 
          }
        ))
      }
    };

    return (
      <div>
        <Modal {...modalFormProps}>
          <div>
            <Row>
              <Col span={20}>
              <SearchBar columns={searchColumns} onSearch={onSearch}  />

                <Table 
                  id='user-table'
                  rowSelection={rowSelection}
                  columns={innerColumns}
                  rowKey='id' 
                  pagination={pagination}
                  dataSource={user?user.pageData.list:[]}
                />
              </Col>
              <Col span={4}>
                <div id='selected-user'>
                  <div className='title'>当前已选择{selectUsers.length}项:</div>
                  <div className='content'>
                    {
                      selectUsers.map(user=>(
                      <Tag className='user-tag' key={user.id} closable onClose={()=>handleCloseTag(user)}>
                        {user.firstName}
                      </Tag>
                      ))
                    }
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Modal>
      </div>
    )
  }
  
}