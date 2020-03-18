import React from 'react';
import EC from 'components/Charts/ECharts/EC';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

export default class Chart extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      cnt: 0
    };
  }
  getOption = (config) => ({
    title: {
      text: config.title,
      subtext: '纯属虚构',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: config.legend
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '60%',
        center: ['50%', '50%'],
        data: config.data,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });

  onChartClick = (param, echarts) => {
    console.log(param, echarts);
    alert('chart click');
    this.setState({
      cnt: this.state.cnt + 1
    });
  };

  onChartLegendselectchanged = (param, echart) => {
    console.log(param, echart);
    alert('chart legendselectchanged');
  };

  onChartReady = echarts => {
    console.log('echart is ready', echarts);
  };

  render () {
    const config = this.props.children
    config.legend = []
    config.data.map(item => {
      config.legend.push(item.name)
    })
    let onEvents = {
      click: this.onChartClick,
      legendselectchanged: this.onChartLegendselectchanged
    };

    return (
      <div style={{ width: '450px', height: '300px' }}>
        <EC
          option={this.getOption(config)}
          onChartReady={this.onChartReady}
          onEvents={onEvents}
        />

      </div>
    );
  }
}
