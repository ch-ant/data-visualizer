-- Temp SQL Queries (should be deleted at some point)

SELECT * FROM data_visualizer.countries LIMIT 50000;
SELECT * FROM data_visualizer.indicators LIMIT 50000;
SELECT * FROM data_visualizer.measurements LIMIT 50000;

SELECT DISTINCT code, name FROM indicators;
SELECT * FROM data_visualizer.temp_data WHERE indicator_code = 'SH.STA.MALN.FE.ZS';

select count(country_id) from data_visualizer.measurements;

SELECT DISTINCT id, code, name FROM indicators;
SELECT * FROM indicators WHERE code = 'FM.LBL.BMNY.ZG';

SHOW INDEX FROM countries;
SHOW INDEX FROM indicators;
SHOW INDEX FROM measurements;

SELECT countries.code, indicators.code, AVG(measurements.`2020`),
indicators.name,
`1960`, `1961`, `1962`, `1963`, `1964`, `1965`, `1966`, `1967`, `1968`, `1969`,
`1970`, `1971`, `1972`, `1973`, `1974`, `1975`, `1976`, `1977`, `1978`, `1979`, 
`1980`, `1981`, `1982`, `1983`, `1984`, `1985`, `1986`, `1987`, `1988`, `1989`, 
`1990`, `1991`, `1992`, `1993`, `1994`, `1995`, `1996`, `1997`, `1998`, `1999`, 
`2000`, `2001`, `2002`, `2003`, `2004`, `2005`, `2006`, `2007`, `2008`, `2009`, 
`2010`, `2011`, `2012`, `2013`, `2014`, `2015`, `2016`, `2017`, `2018`, `2019`, 
`2020`
FROM countries, indicators, measurements
WHERE countries.code = 'FRA'
AND countries.id = measurements.country_id
AND indicators.code = 'GC.TAX.OTHR.CN'
AND indicators.id = measurements.indicator_id
-- GROUP BY measurements.`2020` DIV 5
LIMIT 1000000;


SELECT countries.name, indicators.code, indicators.name,
`1960`, `1961`, `1962`, `1963`, `1964`, `1965`, `1966`, `1967`, `1968`, `1969`,
`1970`, `1971`, `1972`, `1973`, `1974`, `1975`, `1976`, `1977`, `1978`, `1979`, 
`1980`, `1981`, `1982`, `1983`, `1984`, `1985`, `1986`, `1987`, `1988`, `1989`, 
`1990`, `1991`, `1992`, `1993`, `1994`, `1995`, `1996`, `1997`, `1998`, `1999`, 
`2000`, `2001`, `2002`, `2003`, `2004`, `2005`, `2006`, `2007`, `2008`, `2009`, 
`2010`, `2011`, `2012`, `2013`, `2014`, `2015`, `2016`, `2017`, `2018`, `2019`, 
`2020`
FROM countries, indicators, measurements
WHERE countries.income_group = 'High income'
AND countries.id = measurements.country_id
AND indicators.id = measurements.indicator_id
-- GROUP BY measurements.`2020` DIV 5
LIMIT 1000000;


SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE measurements;
TRUNCATE countries;
TRUNCATE indicators;
SET FOREIGN_KEY_CHECKS = 1;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE countries;
DROP TABLE indicators;
DROP TABLE measurements;
SET FOREIGN_KEY_CHECKS = 1;

DROP DATABASE data_visualizer;



SHOW GLOBAL VARIABLES LIKE 'local_infile';
SET GLOBAL local_infile = TRUE;
SHOW VARIABLES LIKE "secure_file_priv";

LOAD DATA LOCAL INFILE 'E:/eclipse-workspace/data/australia/csv/data2.csv'
INTO TABLE temp_data
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 4 LINES;