import React, { useEffect, useState } from 'react';
import { Card, Collapse, Form } from 'react-bootstrap';
import { Button, ButtonGroup, CardBody, Input, Row } from 'reactstrap';
import logging from '../../config/logging';
import { IFilterTimeParam } from '../../interfaces/filterTimeParam';

export interface ITimeQueryParams {}

const MIN_YEAR = 1960;
const MAX_YEAR = 2020;
const NO_AGGREGATION = 0;
const MEAN_5_YEAR_PERIOD = 5;
const MEAN_10_YEAR_PERIOD = 10;

const TimeQueryParams: React.FunctionComponent<ITimeQueryParams> = (props) => {
    const [filterTimeSelected, setFilterTimeSelected] = useState(false);
    const [aggregateTimeSelected, setAggregateTimeSelected] = useState(false);
    const [from, setFrom] = useState<number>(MIN_YEAR);
    const [to, setTo] = useState<number>(MAX_YEAR);

    useEffect(() => {
        saveFilterTimeParamToSessionStorage(from, to);
        saveAggregateTimeParamToSessionStorage(NO_AGGREGATION);
    }, []);

    function saveFilterTimeParamToSessionStorage(from: number, to: number) {
        const [validFrom, validTo] = validateRange(from, to);
        let filterTimeParam: IFilterTimeParam = {
            from: validFrom,
            to: validTo
        };
        sessionStorage.filterTimeParam = JSON.stringify(filterTimeParam);
    }

    function validateRange(from: number, to: number): [number, number] {
        if (from <= to && from >= MIN_YEAR && to <= MAX_YEAR) {
            return [from, to];
        }
        return [MIN_YEAR, MAX_YEAR];
    }

    function saveAggregateTimeParamToSessionStorage(value: number) {
        sessionStorage.aggregateTimeParam = value;
        logging.debug('aggregateTimeParam: ', sessionStorage.aggregateTimeParam);
    }

    const fromInput = (
        <>
            <label>From:</label>
            <Input
                type="number"
                placeholder="1960"
                min={1960}
                max={to}
                style={{ margin: '5px' }}
                value={from}
                onChange={(e) => {
                    setFrom(parseInt(e.target.value));
                }}
            ></Input>
        </>
    );

    const toInput = (
        <>
            <label className="mt-3">To:</label>
            <Input
                type="number"
                placeholder="2020"
                min={from}
                max={2020}
                style={{ margin: '5px' }}
                value={to}
                onChange={(e) => {
                    setTo(parseInt(e.target.value));
                }}
            ></Input>
        </>
    );

    const confirmFilterTimeButton = (
        <Button
            className="ml-4  mr-4 mt-4 d-flex justify-content-center"
            size="sm"
            outline
            color="light"
            onClick={() => {
                setFilterTimeSelected(!filterTimeSelected);
                saveFilterTimeParamToSessionStorage(from, to);
            }}
        >
            Confirm
        </Button>
    );

    const cancelFilterTimeButton = (
        <Button
            className="ml-4  mr-4 mt-4 d-flex justify-content-center"
            size="sm"
            outline
            color="danger"
            onClick={() => {
                setFilterTimeSelected(!filterTimeSelected);
                saveFilterTimeParamToSessionStorage(MIN_YEAR, MAX_YEAR);
            }}
        >
            Cancel
        </Button>
    );

    const filterTimeParams = (
        <Collapse in={filterTimeSelected} className="ml-2">
            <Card className="p-4">
                {fromInput}
                {toInput}
                <Row>
                    {confirmFilterTimeButton}
                    {cancelFilterTimeButton}
                </Row>
            </Card>
        </Collapse>
    );

    const filterTimeButton = (
        <Button onClick={() => setFilterTimeSelected(!filterTimeSelected)} aria-controls="example-collapse-text" aria-expanded={filterTimeSelected} size="sm">
            Filter time
        </Button>
    );

    const aggregateTimeButton = (
        <Button onClick={() => setAggregateTimeSelected(!aggregateTimeSelected)} aria-controls="example-collapse-text" aria-expanded={aggregateTimeSelected} size="sm">
            Aggregate time
        </Button>
    );

    const filterOrAggregateSelectionButtonGroup = (
        <div>
            <ButtonGroup>
                {filterTimeButton}
                {aggregateTimeButton}
            </ButtonGroup>
        </div>
    );

    function addAggregateOptionRadioButton(label: string, param: number) {
        return (
            <Form.Check
                className="mb-2"
                type="radio"
                id={`default-radio`}
                label={label}
                name="aggregate"
                onClick={() => {
                    saveAggregateTimeParamToSessionStorage(param);
                }}
            />
        );
    }

    const doneAggregateTimeButton = (
        <Button
            className="m-3 d-flex justify-content-center"
            size="sm"
            outline
            color="light"
            onClick={() => {
                setAggregateTimeSelected(!aggregateTimeSelected);
                saveFilterTimeParamToSessionStorage(MIN_YEAR, MAX_YEAR);
            }}
        >
            Done
        </Button>
    );

    const aggregateTimeParams = (
        <Collapse in={aggregateTimeSelected}>
            <Card>
                <CardBody>
                    <Form className="p-2">
                        {addAggregateOptionRadioButton(`No aggregation`, NO_AGGREGATION)}
                        {addAggregateOptionRadioButton(`Mean for 5-year periods`, MEAN_5_YEAR_PERIOD)}
                        {addAggregateOptionRadioButton(`Mean for 10-year periods`, MEAN_10_YEAR_PERIOD)}
                    </Form>
                </CardBody>
                {doneAggregateTimeButton}
            </Card>
        </Collapse>
    );

    return (
        <div style={{ margin: '45px' }} className="d-flex justify-content-center">
            <Collapse in={!filterTimeSelected && !aggregateTimeSelected}>{filterOrAggregateSelectionButtonGroup}</Collapse>
            {filterTimeParams}
            {aggregateTimeParams}
        </div>
    );
};

export default TimeQueryParams;
