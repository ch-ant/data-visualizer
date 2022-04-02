import React from 'react';
import { ScatterChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Scatter } from 'recharts';
import { colors } from '../../assets/colors';

export interface IScatterChart {
    data: Array<any>;
    keys: Array<string>;
}

const ScatterPlotComponent: React.FunctionComponent<IScatterChart> = (props) => {
    const { data, keys } = props;

    return (
        <div style={{ width: 900, height: 500 }}>
            <div style={{ textAlign: 'left', color: `${colors[6]}` }}>Y: {keys[2]}</div>
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" dataKey={keys[1]} name={keys[1]} />
                    <YAxis type="number" dataKey={keys[2]} name={keys[2]} />
                    <Tooltip
                        itemStyle={{ background: `rgba(38, 38, 38, 1.0)`, color: `${colors[2]}` }}
                        wrapperStyle={{ background: `rgba(38, 38, 38, 1.0)` }}
                        contentStyle={{ background: `rgba(38, 38, 38, 1.0)` }}
                        label={{ background: `rgba(38, 38, 38, 1.0)` }}
                        cursor={{ strokeDasharray: '3 3' }}
                        position={{ x: 100, y: 500 }}
                    />
                    <Legend align="right" verticalAlign="bottom" payload={[{ value: `X: ${keys[1]}`, type: 'line', id: '' }]} />
                    <Scatter name={keys[1]} data={data} fill={colors[1]} shape={'circle'} />;
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
};
export default ScatterPlotComponent;
