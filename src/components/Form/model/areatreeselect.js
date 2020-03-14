import React, { Component } from 'react';
import { TreeSelect } from 'antd';
import $$ from 'cmn-utils';
import {Net} from '@/utils/request'

const pathBase = 'area';
const treeData = [
  {
    value: 0,
    key: 0,
    title: '中国',
    isLeaf: false,
  },
];

class AreaTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: treeData,
    };
  }

  onLoadData = async treeNode => {
    const { value } = treeNode.props;
    const newList = _.cloneDeepWith(this.state.treeData)
    const data = await Net.post(`/${pathBase}/get_children?pid=${value}`, null,{afterResponse:null})
    const children = data.map(item=>{
      return {
        value: item.code,
        key: item.code,
        title: item.name,
        isLeaf: !(item.level < this.props.maxlevel),
      }
    });

    const dataMap = (items) => {
      items.find((item) => {
        if (item.value === value) {
          //找到当前要展开的节点
          item.children = children
          return items
        }
        if (item.children && item.children.length > 0) {
          dataMap(item.children)
        }
      })
    }
    dataMap(newList|| [])
    this.setState({
      treeData: newList,
    });
  };
  render() {
    const {treeData} = this.state;
    const {onLoadData} = this;
    const props = {...this.props, treeData, loadData:onLoadData,dropdownStyle	:{ maxHeight: 400, overflow: 'auto' }}
    return(
      <TreeSelect {...props} />
      )
  }
}
/**
 * 下拉树菜单元件
 */
export const TreeSelectForm = ({
  form,
  name,
  formFieldOptions = {},
  children,
  record,
  initialValue,
  normalize,
  rules,
  onChange,
  getPopupContainer,
  placeholder,
  maxlevel = 3,
  ...otherProps
}) => {
  // --
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

  // 如果有rules
  if (rules && rules.length) {
    formFieldOptions.rules = rules;
  }

  // 如果需要onChange
  if (typeof onChange === 'function') {
    formFieldOptions.onChange = (value, label, extra) =>
      onChange(form, value, label, extra); // form, value
  }

  const props = {
    placeholder: placeholder || `请选择${otherProps.title}`,
    maxlevel,
    ...otherProps
  };

  if (getPopupContainer) {
    props.getPopupContainer = getPopupContainer;
  }

  return getFieldDecorator(name, formFieldOptions)(
    <AreaTree {...props} />
  );
};

export default TreeSelectForm;
