import { useState } from 'react';
import { Button, Container, Fade, Input } from 'reactstrap';
import IIndicator from '../../model/indicator';
import { IQueryParam } from '../../pages/select';

export interface ISearchProps {
    indicators: IIndicator[];
    param: IQueryParam;
}

const filterIndicators = (searchQuery: string, items: any[]) => {
    if (!searchQuery) {
        return [];
    }
    return items.filter((item: { name: string | any[] }) => item.name.includes(searchQuery));
};

const SearchBar: React.FunctionComponent<ISearchProps> = (props) => {
    let { indicators, param } = props;
    const [selectedIndicator, setSelectedIndicator] = useState<string>('Search');
    const [searchQuery, setSearchQuery] = useState('');
    const [inputText, setInputText] = useState<string>('');
    const [searching, setSearching] = useState<boolean>(false);
    const [selected, setSelected] = useState<boolean>(false);

    let filteredIndicators = filterIndicators(searchQuery, indicators);

    const indicatorInputFIeld = (
        <Input
            valid={selected}
            placeholder={selectedIndicator}
            type="text"
            value={inputText}
            onChange={(e) => {
                setSelected(false);
                setInputText(e.target.value);
                setTimeout(function () {
                    setSearchQuery(e.target.value);
                }, 300);
            }}
        />
    );

    const indicatorsList = <ul className="mt-1 p-2">{displayIndicatorsList()}</ul>;

    function displayIndicatorsList() {
        if (selected) {
            return <></>;
        } else {
            return filteredIndicators.map((indicator, index) => (
                <Fade>
                    <Button
                        className="mt-2 p-2 d-flex justify-content-center"
                        key={index}
                        onClick={() => {
                            setSelectedIndicator(indicator.name);
                            param.indicatorName = indicator.name;
                            param.indicatorCode = indicator.code;
                            setSelected(true);
                            setInputText('');
                        }}
                    >
                        {indicator.name}
                    </Button>
                </Fade>
            ));
        }
    }

    return (
        <Container className="mt-4">
            <label>Indicator</label>
            {indicatorInputFIeld}
            {indicatorsList}
        </Container>
    );
};

export default SearchBar;
