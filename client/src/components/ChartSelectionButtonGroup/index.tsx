import React from 'react';
import { Button } from 'reactstrap';
import { ButtonGroup } from 'react-bootstrap';

export interface IChartsSelection {
    firstOption: React.Dispatch<React.SetStateAction<boolean>>;
    secondOption: React.Dispatch<React.SetStateAction<boolean>>;
    thirdOption: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChartSelectionButtonGroup: React.FunctionComponent<IChartsSelection> = (props) => {
    const { firstOption, secondOption, thirdOption } = props;

    return (
        <div className="d-flex justify-content-center mt-5">
            <ButtonGroup aria-label="outlined primary button group">
                <Button
                    onClick={() => {
                        firstOption(true);
                        secondOption(false);
                        thirdOption(false);
                    }}
                >
                    Line Chart
                </Button>
                <Button
                    onClick={() => {
                        firstOption(false);
                        secondOption(true);
                        thirdOption(false);
                    }}
                >
                    Bar Chart
                </Button>
                <Button
                    onClick={() => {
                        firstOption(false);
                        secondOption(false);
                        thirdOption(true);
                    }}
                >
                    Scatter Plot
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default ChartSelectionButtonGroup;
