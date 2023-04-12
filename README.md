# Workday api implementation

## Introduction
Application that allows you to define a configuration for specific usecases for the workday calculcator

## Endpoints
The application has 4 endpoints.
 - getConfig (get the configuration for a specific ref)
 - putConfig (put the configuration for a specific ref)
 - isWorkday defines if the given date is a workday for a given ref
 - addWorkdays calculates the first workday after a specific number of days for a specific date
 - getHolidays to fetch all the holidays for a given zone

# TODO
 - Write the unit tests
 - Allow for option to generate the .cache on startup for each x.json file that is present