import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { colors } from '../../assets/colors';

export interface ILineChart {
    data: Array<any>;
    keys: Array<string>;
}

const LineChartComponent: React.FunctionComponent<ILineChart> = (props) => {
    const { children, data, keys } = props;

    return (
        <div style={{ width: 800, height: 475 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
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
                    <Tooltip position={{ x: 200, y: -200 }} />
                    <Legend />
                    {keys.map((key, index) => {
                        if (index > 0) {
                            return <Line key={index} type="monotone" dataKey={keys[index]} stroke={colors[index]} activeDot={{ r: 5 }} />;
                        }
                    })}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
export default LineChartComponent;
