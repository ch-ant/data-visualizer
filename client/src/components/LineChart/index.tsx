import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export interface Item {
    name: string;
    uv: number;
    pv: number;
    amt: number;
}
export interface ILineChart {
    data: Array<Item>;
}

const LineChartComponent: React.FunctionComponent<ILineChart> = (props) => {
    const { children, data } = props;

    return (
        <div style={{ width: 625, height: 375 }}>
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
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="amt" stroke="#e2aa2d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
export default LineChartComponent;
