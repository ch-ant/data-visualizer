import React from 'react';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar } from 'recharts';
import { colors } from '../../assets/colors';

export interface IBarChart {
    data: Array<any>;
    keys: Array<string>;
}

const BarChartComponent: React.FunctionComponent<IBarChart> = (props) => {
    const { data, keys } = props;

    return (
        <div style={{ width: 1000, height: 500 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={keys[0]} />
                    <YAxis />
                    <Tooltip
                        itemStyle={{ background: `rgba(38, 38, 38, 1.0)` }}
                        wrapperStyle={{ background: `rgba(38, 38, 38, 1.0)` }}
                        contentStyle={{ background: `rgba(38, 38, 38, 1.0)` }}
                        label={{ background: `rgba(38, 38, 38, 1.0)` }}
                        position={{ x: 100, y: 500 }}
                    />
                    <Legend />
                    {keys.map((key, index) => {
                        if (index > 0) {
                            return <Bar dataKey={keys[index]} fill={colors[index]} legendType={'plainline'} />;
                        }
                    })}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
export default BarChartComponent;
