# Workday api implementation

## Introduction
Application that allows you to define a configuration for specific usecases for the workday calculcator

## Endpoints
The application has 4 endpoints.
 - getConfig (get the configuration for a specific ref)
 - putConfig (put the configuration for a specific ref)
 - isWorkday defines if the given date is a workday for a given ref
 - addWorkdays calculates the first workday after a specific number of days for a specific date

# TODO
 - Define a structured output
 - Write the unit tests
 - Transform the project to a typescript project for proper typing
 - Create a docker file
 - Modify the generator code such that you can define which holidays you want to include
 - Create an endpoint to fetch all national holidays for a specific country/state
 - Add states to the parameter set for the holidays