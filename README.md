# API Tech Stack & Requirements

1) Nodejs for end-to-end backend code developement.
2) Mongodb for storage.
3) You must have [Docker](https://docs.docker.com/get-docker/) for deploying or containerized the Database and Nodejs environment.
4) You have must have [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) for cloning the project.
5) Use any api-endpoint testing tools like Postman, Thunderclient (VS code Extension)

## Project Setup

Use git clone command to download the project.

```bash
git clone https://github.com/Yaswanthtoga/my-api.git
```
![Alt Text]()

Open your favourite terminal where you cloned project should be at the root and run these commands

```
# This command will used to create the respective docker containers.
docker-compose build

# This command will be used to start the containers
docker-compose up
```

That's It!, the project setup done you no need to install nodejs and mongodb separarely because we are running the containers where small packages will be installed for it. And also for the mongodb container there will be a backup which was internally setupped so even the container deleted the volumes will be added immediately and data will be persist.

## API Endpoints Usage

```python
# Endpoint-1
# For Adding the Climate Data
# Note : Necessary Validations Added

Post : http://localhost:3000/api/climate-data

# Example
Request Data Format : 
{
    "climate":"humid",
    "area_code":100,
    "temperature":25,
    "humidity":45,
    "chances_of_rain":34
}

Response Data :
{
    "success": true,
    "error": null,
    "data": {
        "id": "6d5feb01-a765-4ef5-9963-9b9e27c7e902"
    }
}
```


```python
# Endpoint-2
# Get All Saved Records
# Note : Necessary Validations Added

Get : http://localhost:3000/api/get-all-records

# Example
Response Data :
{
    "data": [
        {
            "_id": "6509ddee86b597d56e99da30",
            "climate": "humid",
            "area_code": 100,
            "temperature": 25,
            "humidity": 45,
            "chances_of_rain": 34,
            "__v": 0
        }
    ]
}
```

```python
# Endpoint-3
# Get All Saved Records For an Area
# Note : Necessary Validations Added

Get : http://localhost:3000/api/get-all-records/:area_code

Params => area_code
{ Inplace of ":area_code" pass the preferred code to get the data }

# Example
Get : http://localhost:3000/api/get-all-records/100

Response Data :
{
    "data": [
        {
            "_id": "6509ddee86b597d56e99da30",
            "climate": "humid",
            "area_code": 100,
            "temperature": 25,
            "humidity": 45,
            "chances_of_rain": 34,
            "__v": 0
        }
    ]
}
```

```python
# Endpoint-4
# Get All Saved Records For an Area with given climate
# Note : Necessary Validations Added

Get : http://localhost:3000/api/get-all-records/:area_code/:climate

Params => area_code
{ Inplace of ":area_code" and ":climate" pass the preferred code,climate values to get the data }

# Example
Get : http://localhost:3000/api/get-all-records/100/humid

Response Data :
{
    "data": [
        {
            "_id": "6509ddee86b597d56e99da30",
            "climate": "humid",
            "area_code": 100,
            "temperature": 25,
            "humidity": 45,
            "chances_of_rain": 34,
            "__v": 0
        }
    ]
}
```

```python
# Endpoint-5
# Get the Climate Delta
# Note : Necessary Validations Added

Post : http://localhost:3000/api/get-climate-delta

# Example
Request Data Format :
{
    "from_climate":"hot",
    "to_climate":"humid",
    "area_code": 100
}

Response Data :
{
    "climate_delta": "hot -> humid",
    "temperature_delta": 0,
    "humidity_delta": 0,
    "rain_chances_delta": 0,
    "climate_change_index": null
}
```

## Conclusion
Thanks for Visiting, any suggestions for changes always open requests for you :)
