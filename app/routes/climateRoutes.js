const { addClimateData, getAllRecords, getRecordsOfArea, getRecordsOfAreaNClimate, calculateClimateDelta } = require('../controller/climateController.js');

const routes = require('express').Router()

// Adding Climate Info
routes.post('/climate-data',addClimateData);

// Fetching all saved records
routes.get('/get-all-records',getAllRecords);

// Fetching all records for an area
routes.get('/get-all-records/:area_code',getRecordsOfArea);

// Fetching all records for an area with particular climate
routes.get('/get-all-records/:area_code/:climate',getRecordsOfAreaNClimate);

routes.post('/get-climate-delta',calculateClimateDelta)

module.exports = routes;