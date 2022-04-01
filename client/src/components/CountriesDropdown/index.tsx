import React from 'react';
import { Dropdown } from 'react-bootstrap';
import ICountry from '../../model/country';
import { IQueryParam } from '../../interfaces/queryParam';

export interface ICountriesDropdown {
    queryParams: IQueryParam[];
    setQueryParams: React.Dispatch<React.SetStateAction<IQueryParam[]>>;
    countries: ICountry[];
    paramIndex: number;
}

const CountriesDropdown: React.FunctionComponent<ICountriesDropdown> = (props) => {
    const { queryParams, setQueryParams, countries, paramIndex } = props;
    const scrollable: React.CSSProperties = { maxHeight: '300px', overflowY: 'scroll', margin: 0 };

    const noCountriesFoundMessage = (
        <p className="p-4">
            There are no countries in the database.<br></br> Sorry! 😢
        </p>
    );

    function displayCountriesList() {
        if (countries.length === 0) {
            return noCountriesFoundMessage;
        } else {
            return countries.map((country, index) => {
                return createDropdownItem(country, index);
            });
        }
    }

    function createDropdownItem(country: ICountry, index: number): JSX.Element {
        return (
            <Dropdown.Item
                key={index}
                onClick={() => {
                    selectCountry(paramIndex, country);
                }}
            >
                {country.name}
            </Dropdown.Item>
        );
    }

    function selectCountry(index: number, country: ICountry) {
        let newQueryParams = [...queryParams];
        newQueryParams[index].countryId = country.id;
        setQueryParams(newQueryParams);
    }

    function displaySelectedCountryName() {
        const countryId = queryParams[paramIndex].countryId;
        if (countryId === BigInt(0)) return 'Select Country';
        return findCountryById(countryId)?.name;
    }

    function findCountryById(id: bigint) {
        return countries.find((country) => {
            return country.id === id;
        });
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                {displaySelectedCountryName()}
            </Dropdown.Toggle>
            <Dropdown.Menu style={scrollable}>{displayCountriesList()}</Dropdown.Menu>
        </Dropdown>
    );
};

export default CountriesDropdown;
