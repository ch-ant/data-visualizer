#
#   This transformer script is part of the data ETL process.
#   It takes the extracted data, country metadata and indicator
#   metadata files as input and transforms them into three csv 
#   files: data, country metadata and indicator metadata 
#   respectively. The transformed files contain the data (or metadata)
#   in a format that is ready to be loaded into the database using 
#   the load.sql script in the same directory. Input and output directories
#   as well as names for the transformed data files can be specified below.
#
#   Important Notes:
#   The extracted data files must be placed in the input directory that 
#   was specified. Multiple extracted data files can be placed and transformed
#   at once. It is important for the correct execution of the script that the 
#   extracted data files names retain the naming conventions as extracted 
#   from https://data.worldbank.org/country. More specifically, indicator
#   metadata files should begin with 'Metadata_Indicator', country metadata
#   files should begin with 'Metadata_Country' and data files should begin
#   with 'API'.
#
#   Run command:    python transform.py
#   Preferably execute in Linux environment   
#


from csv import reader
from os import chdir
from glob import glob


# Specify input and output directories
INPUT_DIR = "./extracted_data"
OUTPUT_DIR = "../transformed_data"

# Specify ouput file names for the transformed data
OUTPUT_COUNTRY_META_FILE = 'transformed_country_metadata.csv'
OUTPUT_INDICATOR_META_FILE = 'transformed_indicator_metadata.csv'
OUTPUT_DATA_FILE = 'transformed_data.csv'


class Measurement:
    def __init__(self, countryCode, indicatorCode):
        self.countryCode = countryCode
        self.indicatorCode = indicatorCode
        self.values = []

    def toString(self):
        delimiter = "\",\""
        return "\"" + self.countryCode + delimiter + \
                self.indicatorCode + delimiter + \
                delimiter.join(self.values) + "\""


class Country:
    def __init__(self, name, code, region, incomeGroup, specialNotes):
        self.name = name
        self.code = code
        self.region = region
        self.incomeGroup = incomeGroup
        self.specialNotes = specialNotes

    def existsInList(self, countries):
        for country in countries:
            if self.name == country.name and self.code == country.code:
                return True
        return False

    def toString(self):
            delimiter = "\",\""
            return "\"" + self.name + delimiter + \
                    self.code + delimiter + \
                    self.region + delimiter + \
                    self.incomeGroup + delimiter + \
                    self.specialNotes + "\""


class Indicator:
    def __init__(self, name, code, sourceNote, sourceOrganization):
        self.name = name
        self.code = code
        self.sourceNote = sourceNote
        self.sourceOrganization = sourceOrganization
    
    def existsInList(self, indicators):
        for indicator in indicators:
            if self.name == indicator.name and \
                    self.code == indicator.code and \
                    self.sourceNote == indicator.sourceNote and \
                    self.sourceOrganization == indicator.sourceOrganization:
                return True
        return False

    def toString(self):
        delimiter = "\",\""
        return "\"" + self.name + delimiter + \
                self.code + delimiter + \
                self.sourceNote + delimiter + \
                self.sourceOrganization + "\""




def findInputFiles():
    chdir(INPUT_DIR)
    return glob("*.csv")


def transformInputFiles(inputFiles):
    for file in inputFiles:
        data = readFileToString(file)
        if file.startswith("API"):
            transformDataFile(data)
        elif file.startswith('Metadata_Country'):
            transformCountryMetadataFile(data)
        elif file.startswith('Metadata_Indicator'):
            transformMetadataIndicatorFile(data)


def transformDataFile(data):
    data = transformNullValues(data)
    data = data.splitlines()
    years = findYears(data)
    data = readCsv(data, 5)
    transformData(data, years)


def transformCountryMetadataFile(data):
    data = transformNullValues(data)
    data = data.splitlines()
    tableNameIndex, specialNotesIndex = findColumnNameIndexes(data[0])
    data = readCsv(data, 1)
    transformCountryMetadata(data, tableNameIndex, specialNotesIndex)
    

def transformMetadataIndicatorFile(data):
    data = data.splitlines()
    data = readCsv(data, 1)
    transformIndicatorMetadata(data)


def readFileToString(file):
    file = open(file, "rt", encoding="utf8")
    data = file.read()
    file.close()
    return data


def transformNullValues(data):
    return data.replace("\"\"", "\"\\N\"")


def findYears(data):
    header = data[4].replace('"', '')
    years = header.split(',')[4:]
    del years[-1]
    return years


def readCsv(data, startLine):
    data = reader(data[startLine:], delimiter = ',')
    return list(data)


def transformData(data, years):
    for line in data:
        measurement = Measurement(line[1], line[3])
        counter = 4
        for year in years:
            measurement.values.append(line[counter])
            counter += 1
        measurements.append(measurement)


def transformCountryMetadata(data, tableNameIndex, specialNotesIndex):
    for line in data:
        country = Country(line[tableNameIndex], line[0], line[1], line[2], line[specialNotesIndex])
        if not country.existsInList(countries):
            countries.append(country)


def transformIndicatorMetadata(data):
    for line in data:
        indicator = Indicator(line[1], line[0], line[2], line[3])
        if not indicator.existsInList(indicators):
            indicators.append(indicator)


def findColumnNameIndexes(header):
    header = header.replace('"', '').split(',')
    for column in header:
        if column == "TableName":
            tableNameIndex = header.index(column)
        elif column == "SpecialNotes":
            specialNotesIndex = header.index(column)
    return tableNameIndex, specialNotesIndex


def createOutputFiles():
    chdir(OUTPUT_DIR)
    createOutputFile(countries, OUTPUT_COUNTRY_META_FILE)
    createOutputFile(indicators, OUTPUT_INDICATOR_META_FILE)
    createOutputFile(measurements, OUTPUT_DATA_FILE)


def createOutputFile(list, outputFile):
    buf = ''
    for object in list:
        buf += object.toString() + ",\n"
    writeToFile(buf, outputFile, list)


def writeToFile(buf, file, list):
    msg = '>>> Transformed ' + str(len(list)) + ' lines in file:\t' + file
    file = open(file, "w+", encoding="utf8")
    file.write(buf)
    file.close()
    print(msg)




if __name__ == '__main__':
    measurements = []
    countries = []
    indicators = []
    indicatorSources = []

    inputFiles = findInputFiles()
    transformInputFiles(inputFiles)
    createOutputFiles()
