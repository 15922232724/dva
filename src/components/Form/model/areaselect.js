import React, { Component } from 'react';
import { Cascader } from 'antd';
import $$ from 'cmn-utils';
import {Net} from '@/utils/request'

/**
 * 级联表单元件
 * initialValue 初始值
 */
const pathBase = 'area';
const options = [
  {
    value: '0',
    label: '中国',
    isLeaf: false,
  },
];
class AreaCascader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: options,
    };
  }

  loadData = async selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    const data = await Net.post(`/${pathBase}/get_children?pid=${targetOption.value}`, null,{afterResponse:null})
    targetOption.loading = false;

    const children = data.map(item=>{
      return {
        label: item.name,
        value: item.code,
        isLeaf: !(item.level < this.props.maxlevel)
      }
    })
    targetOption.children = children
    this.setState({
      options: [...this.state.options],
    });
  };
  render() {
    const {options} = this.state;
    const {loadData} = this;
    const props = {...this.props, options, loadData}
    return(
      <Cascader {...props} />
    )
  }
}
export default ({
  name,
  form,
  record,
  formFieldOptions = {},
  normalize,
  initialValue,
  rules,
  onChange,
  preview,
  getPopupContainer,
  placeholder,
  // 最大深度
  maxlevel=3,
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
    if (otherProps.options && initval) {
      const data = [];
      let level = 0;
      const loop = opts => {
        opts.forEach(item => {
          if (item.value === initval[level]) {
            data.push(item.label);
            if (item.children && initval[++level]) {
              loop(item.children);
            }
          }
        });
      };
      loop(otherProps.options);
      return <div style={otherProps.style}>{data.join(' / ')}</div>;
    }
    return null;
  }

  // 如果有rules
  if (rules && rules.length) {
    formFieldOptions.rules = rules;
  }

  // 如果需要onChange
  if (typeof onChange === 'function') {
    formFieldOptions.onChange = (value, selectedOptions) =>
      onChange(form, value, selectedOptions); // form, value, selectedOptions
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
    <AreaCascader {...props} />
  );
};
