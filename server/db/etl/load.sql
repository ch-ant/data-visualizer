/* 
	This loader script is part of the data ETL process.
    It takes the transformed data, country metadata and
    indicator metadata files as input and loads them into
    the database using the LOAD DATA INFILE command.
    The full path of each data (or metadata) file should
    be specified in the first line of each LOAD DATA INFILE
    command.

	How to run: Open the script in MySQL Workbench and 
	click execute.
*/


USE data_visualizer;
SET GLOBAL local_infile = TRUE;


CREATE TABLE temp_measurements (
	country_code VARCHAR(32) NOT NULL,
    indicator_code VARCHAR(32) NOT NULL,
    `1960` DOUBLE, `1961` DOUBLE, `1962` DOUBLE, `1963` DOUBLE, `1964` DOUBLE,
	`1965` DOUBLE, `1966` DOUBLE, `1967` DOUBLE, `1968` DOUBLE, `1969` DOUBLE,
	`1970` DOUBLE, `1971` DOUBLE, `1972` DOUBLE, `1973` DOUBLE, `1974` DOUBLE,
	`1975` DOUBLE, `1976` DOUBLE, `1977` DOUBLE, `1978` DOUBLE, `1979` DOUBLE, 
	`1980` DOUBLE, `1981` DOUBLE, `1982` DOUBLE, `1983` DOUBLE, `1984` DOUBLE,
	`1985` DOUBLE, `1986` DOUBLE, `1987` DOUBLE, `1988` DOUBLE, `1989` DOUBLE, 
	`1990` DOUBLE, `1991` DOUBLE, `1992` DOUBLE, `1993` DOUBLE, `1994` DOUBLE,
	`1995` DOUBLE, `1996` DOUBLE, `1997` DOUBLE, `1998` DOUBLE, `1999` DOUBLE, 
	`2000` DOUBLE, `2001` DOUBLE, `2002` DOUBLE, `2003` DOUBLE, `2004` DOUBLE,
	`2005` DOUBLE, `2006` DOUBLE, `2007` DOUBLE, `2008` DOUBLE, `2009` DOUBLE, 
	`2010` DOUBLE, `2011` DOUBLE, `2012` DOUBLE, `2013` DOUBLE, `2014` DOUBLE,
	`2015` DOUBLE, `2016` DOUBLE, `2017` DOUBLE, `2018` DOUBLE, `2019` DOUBLE, 
	`2020` DOUBLE
)
ENGINE = InnoDB 
DEFAULT CHARSET = latin1;


-- Specify csv country metadata file path here
LOAD DATA LOCAL INFILE 'E:/node-projects/data-visualizer/db/etl/transformed_data/transformed_country_metadata.csv'
INTO TABLE countries
CHARACTER SET latin1
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
(name, code, region, income_group, special_notes);


-- Specify csv indicator metadata file path here
LOAD DATA LOCAL INFILE 'E:/node-projects/data-visualizer/db/etl/transformed_data/transformed_indicator_metadata.csv'
INTO TABLE indicators
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
(name, code, source_note, source_organization);


-- Specify csv data file path here
LOAD DATA LOCAL INFILE 'E:/node-projects/data-visualizer/db/etl/transformed_data/transformed_data.csv'
INTO TABLE temp_measurements
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
(country_code, indicator_code,
`1960`, `1961`, `1962`, `1963`, `1964`, `1965`, `1966`, `1967`, `1968`, `1969`,
`1970`, `1971`, `1972`, `1973`, `1974`, `1975`, `1976`, `1977`, `1978`, `1979`, 
`1980`, `1981`, `1982`, `1983`, `1984`, `1985`, `1986`, `1987`, `1988`, `1989`, 
`1990`, `1991`, `1992`, `1993`, `1994`, `1995`, `1996`, `1997`, `1998`, `1999`, 
`2000`, `2001`, `2002`, `2003`, `2004`, `2005`, `2006`, `2007`, `2008`, `2009`, 
`2010`, `2011`, `2012`, `2013`, `2014`, `2015`, `2016`, `2017`, `2018`, `2019`, 
`2020`);


INSERT INTO measurements 
(country_id, indicator_id,
`1960`, `1961`, `1962`, `1963`, `1964`, `1965`, `1966`, `1967`, `1968`, `1969`,
`1970`, `1971`, `1972`, `1973`, `1974`, `1975`, `1976`, `1977`, `1978`, `1979`, 
`1980`, `1981`, `1982`, `1983`, `1984`, `1985`, `1986`, `1987`, `1988`, `1989`, 
`1990`, `1991`, `1992`, `1993`, `1994`, `1995`, `1996`, `1997`, `1998`, `1999`, 
`2000`, `2001`, `2002`, `2003`, `2004`, `2005`, `2006`, `2007`, `2008`, `2009`, 
`2010`, `2011`, `2012`, `2013`, `2014`, `2015`, `2016`, `2017`, `2018`, `2019`, 
`2020`)
SELECT countries.id, indicators.id,
`1960`, `1961`, `1962`, `1963`, `1964`, `1965`, `1966`, `1967`, `1968`, `1969`,
`1970`, `1971`, `1972`, `1973`, `1974`, `1975`, `1976`, `1977`, `1978`, `1979`, 
`1980`, `1981`, `1982`, `1983`, `1984`, `1985`, `1986`, `1987`, `1988`, `1989`, 
`1990`, `1991`, `1992`, `1993`, `1994`, `1995`, `1996`, `1997`, `1998`, `1999`, 
`2000`, `2001`, `2002`, `2003`, `2004`, `2005`, `2006`, `2007`, `2008`, `2009`, 
`2010`, `2011`, `2012`, `2013`, `2014`, `2015`, `2016`, `2017`, `2018`, `2019`, 
`2020`
FROM countries, indicators, temp_measurements
WHERE countries.code = temp_measurements.country_code 
AND indicators.code = temp_measurements.indicator_code;


DROP TABLE temp_measurements;