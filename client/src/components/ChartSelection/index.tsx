import React from 'react';
import { Button } from 'reactstrap';
import { ButtonGroup } from 'react-bootstrap';

export interface IChartsSelection {
    setSelectedChart: React.Dispatch<React.SetStateAction<string>>;
}

const ChartSelection: React.FunctionComponent<IChartsSelection> = (props) => {
    const { setSelectedChart } = props;

    const chartButton = (chartType: string) => {
        return (
            <Button
                onClick={() => {
                    setSelectedChart(chartType);
                }}
            >
                {chartType}
            </Button>
        );
    };

    return (
        <div className="d-flex justify-content-center mt-5">
            <ButtonGroup aria-label="outlined primary button group">
                {chartButton('Line Chart')}
                {chartButton('Bar Chart')}
                {chartButton('Scatter Plot')}
            </ButtonGroup>
        </div>
    );
};

export default ChartSelection;
