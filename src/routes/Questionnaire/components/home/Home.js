import React from 'react';
import EC from 'components/Charts/ECharts/EC';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import Chart from './detail/chart'
import Item from 'antd/lib/list/Item';
import config from './config'
export default class Events extends React.PureComponent {


  render () {
    const renders = config.map((item, index) => {
      return <div key={index} style={{ width: '700px', height: '400px' }}>
        <Chart >{item}</Chart>
      </div>
    })

    return (
      <div style={{ display: 'flex', marginTop: '100px' }}>
        {renders}
      </div>
    );
  }
}
