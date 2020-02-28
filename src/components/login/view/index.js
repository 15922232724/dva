import React, { Component } from 'react'
import { connect } from 'dva';

@connect(({ login }) => ({
  login
}))
export default class extends Component {

  render () {
    return (
      <div >{1}</div>
    )
  }
}
