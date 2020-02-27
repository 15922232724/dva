import React from 'react'
import PropType from 'prop-types'
import { Table, Popconfirm, Button } from 'antd'
const ProductList = ({ onDelete, products }) => {
  const columns = [{
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Actions',
    render: (text, record) => {
      return (
        <Popconfirm title='delete?' onConfirm={() => onDelete(record.id)}>
          <Button>Delete</Button>
        </Popconfirm >
      )
    }
  }]
  return (
    <div>
      <Button></Button>
      <Table
        dataSource={products}
        columns={columns}
      />
    </div>

  )
}
ProductList.prototype = {
  onDelete: PropType.func.isRequired,
  ProductList: PropType.array.isRequired
}
export default ProductList;