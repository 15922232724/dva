import React from 'react';
import G2 from 'components/Charts/G2';
import DataSet from '@antv/data-set';
const { Chart, Axis, Geom, Tooltip, Legend, Coord, Label } = G2;
const { DataView } = DataSet;

export default props => {
  let config = props.children
  const { DataView } = DataSet;
  const data = config.data
  const dv = new DataView();
  dv.source(data).transform({
    type: 'percent',
    field: 'count',
    dimension: 'item',
    as: 'percent'
  });
  const cols = {
    percent: {
      formatter: val => {
        val = val * 100 + '%';
        return val;
      }
    }
  };
  return (

    <div style={{ width: '400px', height: '400px', textAlign: 'center' }}>
      <p>{config.title}</p>
      <Chart
        data={dv}
        scale={cols}
        forceFit
      >
        <Coord type="theta" radius={0.6} />
        <Axis name="percent" />
        <Legend
          position="right"
          offsetY={0}
          offsetX={-80}
        />
        <Tooltip
          showTitle={false}
          itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
        />
        <Geom
          type="intervalStack"
          position="percent"
          color="item"
          tooltip={[
            'item*percent',
            (item, percent) => {
              percent = percent * 100 + '%';
              return {
                name: item,
                value: percent
              };
            }
          ]}
          style={{ lineWidth: 1, stroke: '#fff' }}
        >
          <Label
            content="percent"
            formatter={(val, item) => {
              return item.point.item;
            }}
          />
        </Geom>
      </Chart>
    </div>
  )
}

