import React, { useEffect, useState } from 'react';
import { Card, Collapse } from 'react-bootstrap';
import { Button, ButtonGroup, Input, Row } from 'reactstrap';
import { IFilterTimeParam } from '../../interfaces/filterTimeParam';

export interface ITimeQueryParams {}

const TimeQueryParams: React.FunctionComponent<ITimeQueryParams> = (props) => {
    const MIN_YEAR = 1960;
    const MAX_YEAR = 2020;

    const [filterTimeSelected, setFilterTimeSelected] = useState(false);
    const [aggregateTimeSelected, setAggregateTimeSelected] = useState(false);
    const [from, setFrom] = useState<number>(MIN_YEAR);
    const [to, setTo] = useState<number>(MAX_YEAR);

    useEffect(() => {
        saveFilterTimeParamToSessionStorage(from, to);
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

    const confirmButton = (
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

    const cancelButton = (
        <Button
            className="ml-4  mr-4 mt-4 d-flex justify-content-center"
            size="sm"
            outline
            color="light"
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
                    {confirmButton}
                    {cancelButton}
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

    const aggregateTimeParams = (
        <Collapse in={aggregateTimeSelected}>
            <Card>TODO: Aggregate Time Selected</Card>
        </Collapse>
    );

    return (
        <div style={{ margin: '45px' }} className="d-flex justify-content-center">
            <Collapse in={!filterTimeSelected}>{filterOrAggregateSelectionButtonGroup}</Collapse>
            {filterTimeParams}
            {aggregateTimeParams}
        </div>
    );
};

export default TimeQueryParams;
