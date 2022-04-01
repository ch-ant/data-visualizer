import { useState } from 'react';
import { Button, Input } from 'reactstrap';
import { Dropdown } from 'react-bootstrap';
import IIndicator from '../../model/indicator';
import { IQueryParam } from '../../interfaces/queryParam';

export interface IIndicatorsDropdownProps {
    queryParams: IQueryParam[];
    setQueryParams: React.Dispatch<React.SetStateAction<IQueryParam[]>>;
    indicators: IIndicator[];
    paramIndex: number;
}

const filterIndicators = (searchQuery: string, indicators: any[]) => {
    if (!searchQuery || searchQuery === '') {
        return indicators;
    }
    return indicators.filter((indicator: { name: string | any[] }) => indicator.name.includes(searchQuery));
};

const IndicatorsDropdown: React.FunctionComponent<IIndicatorsDropdownProps> = (props) => {
    const { queryParams, setQueryParams, indicators, paramIndex } = props;

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchBarText, setSearchBarText] = useState<string>('');

    const scrollable: React.CSSProperties = { maxHeight: '300px', overflowY: 'scroll', margin: 0 };

    const selectedIndicatorStyle: React.CSSProperties = {
        textOverflow: 'ellipsis',
        display: 'inline-block',
        overflow: 'hidden',
        width: '50%',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
        textAlign: 'left'
    };

    const searchBar = (
        <Input
            placeholder="Search"
            type="text"
            value={searchBarText}
            onChange={(e) => {
                updateSearchBar(e);
            }}
        />
    );

    function updateSearchBar(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchBarText(e.target.value);
        setTimeout(function () {
            setSearchQuery(e.target.value);
        }, 200);
    }

    function displayIndicatorsList() {
        let filteredIndicators = filterIndicators(searchQuery, indicators);

        return filteredIndicators.map((indicator, index) => {
            return createDropdownItem(indicator, index);
        });
    }

    function createDropdownItem(indicator: IIndicator, index: number): JSX.Element {
        return (
            <Dropdown.Item
                key={index}
                as={Button}
                onClick={() => {
                    selectIndicator(paramIndex, indicator);
                }}
            >
                {indicator.name}
            </Dropdown.Item>
        );
    }

    function selectIndicator(index: number, indicator: IIndicator) {
        let newQueryParams = [...queryParams];
        newQueryParams[index].indicatorId = indicator.id;
        setQueryParams(newQueryParams);
        setSearchQuery('');
        setSearchBarText('');
    }

    function displaySelectedIndicatorName() {
        const indicatorId = queryParams[paramIndex].indicatorId;
        if (indicatorId === BigInt(0)) return 'Select Indicator';
        return findIndicatorById(indicatorId)?.name;
    }

    function findIndicatorById(id: bigint) {
        return indicators.find((indicator) => {
            return indicator.id === id;
        });
    }

    return (
        <Dropdown style={{ width: '170%' }} className="mt-3">
            <Dropdown.Toggle variant="dark" id="dropdown-basic" style={selectedIndicatorStyle}>
                {displaySelectedIndicatorName()}
            </Dropdown.Toggle>
            <Dropdown.Menu style={scrollable}>
                <Dropdown.Header>{searchBar}</Dropdown.Header>
                {displayIndicatorsList()}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default IndicatorsDropdown;
