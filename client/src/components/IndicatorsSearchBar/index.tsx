import { useState } from 'react';
import { Button, Fade, Input } from 'reactstrap';
import { Dropdown } from 'react-bootstrap';
import IIndicator from '../../model/indicator';
import { IQueryParam } from '../../interfaces/queryParam';

export interface ISearchProps {
    indicators: IIndicator[];
    queryParam: IQueryParam;
}

const filterIndicators = (searchQuery: string, items: any[]) => {
    if (!searchQuery) {
        return items;
    }
    return items.filter((item: { name: string | any[] }) => item.name.includes(searchQuery));
};

const SearchBar: React.FunctionComponent<ISearchProps> = (props) => {
    let { indicators, queryParam } = props;
    const [selectedIndicator, setSelectedIndicator] = useState<string>('Select Indicator');
    const [searchQuery, setSearchQuery] = useState('');
    const [inputText, setInputText] = useState<string>('');

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

    let filteredIndicators = filterIndicators(searchQuery, indicators);
    const indicatorInputFIeld = (
        <Input
            placeholder="Search"
            type="text"
            value={inputText}
            onChange={(e) => {
                updateIndicatorInputField(e);
            }}
        />
    );

    function updateIndicatorInputField(e: React.ChangeEvent<HTMLInputElement>) {
        setInputText(e.target.value);
        setTimeout(function () {
            setSearchQuery(e.target.value);
        }, 200);
    }

    function displayIndicatorsList() {
        return filteredIndicators.map((indicator, index) => (
            <Fade key={index}>
                <Dropdown.Item
                    as={Button}
                    onClick={() => {
                        selectIndicator(indicator);
                    }}
                >
                    {indicator.name}
                </Dropdown.Item>
            </Fade>
        ));
    }

    function selectIndicator(indicator: IIndicator) {
        setSelectedIndicator(indicator.name);
        queryParam.indicatorId = indicator.id;
        setInputText('');
    }

    return (
        <Dropdown style={{ width: '170%' }} className="mt-3">
            <Dropdown.Toggle variant="dark" id="dropdown-basic" style={selectedIndicatorStyle}>
                {selectedIndicator}
            </Dropdown.Toggle>
            <Dropdown.Menu style={scrollable}>
                <Dropdown.Header>{indicatorInputFIeld}</Dropdown.Header>
                {displayIndicatorsList()}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default SearchBar;
