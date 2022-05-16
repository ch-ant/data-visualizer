# Data Visualizer

Data Visualizer is an end-to-end software that consists of a MySQL database, a REST API server and a React Web App client. Developed during the [Advanced Topics of Database Technology and Applications](https://www.cs.uoi.gr/course/advanced-topics-of-database-technology-and-applications/?lang=en) course [@cse.uoi.gr](https://www.cs.uoi.gr/).<br><br>

## Summary

The final goal of the project was to implement a data visualization application which utilizes data integrated into a database. The application should be able to be used in order to visually draw conclusions regarding the depicted data. The data which populates the database was extracted from [The World Bank](https://data.worldbank.org/country) and it contains various measurements per year for different indicators for the countries of the European Union. A large portion of the project revolved around designing the database schema and setting up and configuring the database. On top of that strong emphasis was given on the ETL (Extract-Transform-Load) procedure so that the extracted data can integrate in proper structure into the database. A detailed report can be found in the respective pdf under the doc directory. In general, the project can be abstracted into 3 sub-projects:

- The database
- REST API server
- React Web App client

<br>

## Technologies

This section contains a brief overview of the technologies used:

- [MySQL](https://www.mysql.com/) & [MySQL Workbench](https://www.mysql.com/products/workbench/) as a DBMS and database visual tool respectively.
- [Python](https://www.python.org/) as programming language to develop the scripts that transform extracted data to the desired format for loading into the database.
- [GitHub](https://github.com/) for version control. Project repo [here](https://github.com/ch-ant/data-visualizer).
- [Trello](https://trello.com/) for project management and organization. Project board [here](https://trello.com/b/v5u92IBT/data-visualizer). The project board contains cards with all the tasks regarding the implementation of the project as well as various useful information in the form of links that was studied during development.
- [Node.js with Typescript](https://nodejs.dev/learn/nodejs-with-typescript) as a programming language for both the server and the client.
- [React](https://reactjs.org/) as a general library to develop the client UI. Some notable react libraries that were used are [axios](https://www.npmjs.com/package/axios) to implement that API calls and [recharts](https://recharts.org/en-US/) to draw the visualization charts.
- [VSCode](https://code.visualstudio.com/) as an IDE.

<br>

## Features

Users can:

- Search among numerous indicators for visualization.
- Visualize data as bar charts.
- Visualize data as line charts.
- Visualize data as scatter plots.
- Filter the measurements years' for visualization.
- Aggregate measurements into 5 or 10 year periods.

<br>

## Usage

- run server for development:

  - cd data-visualizer/server
  - nodemon src/server.ts

<br>

- run client for development:
  - cd data-visualizer/client
  - npm start
