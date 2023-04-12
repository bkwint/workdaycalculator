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
 - Proper errors should be thrown on different errors

# API documentation
## GetConfig
```GET /v1/:ref/config```

Response:
```
{
    "status": 1,
    "result": {
        "zone": "nl",
        "numberOfYears": 1,
        "workdays": [
            1,
            2,
            3,
            4,
            5
        ],
        "exclude": [],
        "excludeHolidays": []
    }
}
```

## PutConfig
```PUT /v1/:ref/config```

Body (JSON):
```
{
    "status": 1,
    "result": {
        "zone": "nl",
        "numberOfYears": 1,
        "workdays": [
            1,
            2,
            3,
            4,
            5
        ],
        "exclude": [],
        "excludeHolidays": []
    }
}
```

Response (JSON):
```
{
    "status": 1
}
```

## GetHolidays
```GET /v1/holidays/:zone```

Response (JSON):
```
{
    "status": 1,
    "result": []
}
```

## IsWorkday
```GET /v1/:ref/isWorkday/:date```

Response (JSON):
```
{
    "status": 1,
    "result": true
}
```

## AddWorkdays
```GET /v1/:ref/addWorkdays/:date/:nrOfDays```

Response (JSON):
```
{
    "status": 1,
    "result": "2023-12-27"
}
```

# Running in Docker
To run the application in Docker with persistence take the following steps:
```
$ docker build -t workdaysapi .
$ docker run -p 127.0.0.1:8181:8181 -v ${PWD}/.cache:/usr/src/app/.cache -v ${PWD}/.config:/usr/src/app/.cache workdaysapi 
```

To run the application such that it will always regenerate the cache from config at startup
```
$ docker build -t workdaysapi .
$ docker run -p 127.0.0.1:8181:8181 -v ${PWD}/.cache:/usr/src/app/.cache -v ${PWD}/.config:/usr/src/app/.cache -e REGENERATE=1 workdaysapi 
```