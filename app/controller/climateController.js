const Climate = require('../models/climateModel.js');
const uuid  = require('uuid');

const addClimateData = async (req,res,next)=>{
    try {
        const data = {...req.body};
        
        // Creating new climate info
        const result = new Climate(data);
        await result.save();
        return res.status(200).json({
            success: true,
            error: null,
            data:{
                id:uuid.v4()
            }
        });

    } catch (error) {
        next(error);
    }
};

const getAllRecords = async (req,res,next)=>{
    try {
        const data = await Climate.find();
        return res.status(200).json({data});
    } catch (error) {
        next(error);
    }
}

const getRecordsOfArea = async (req,res,next)=>{
    try {
        const data = await Climate.find({area_code:req.params.area_code});
        return res.status(200).json({data});
    } catch (error) {
        next(error);
    }
}

const getRecordsOfAreaNClimate = async (req,res,next)=>{
    try {
        const query = {
            $and:[
                { area_code : req.params.area_code },
                { climate : req.params.climate }
            ]
        }
        const data = await Climate.find(query);
        return res.status(200).json({data});
    } catch (error) {
        next(error);
    }
}

const calculateClimateDelta = async (req,res,next)=>{
    try {
        const { from_climate, to_climate, area_code } = req.body;

        // Validate the input data
        if (!from_climate || !to_climate || from_climate === to_climate) {
            throw new Error('Invalid input data');
        }

        // Query the database for climate records matching the area_code
        const climateRecords = await Climate.find({ area_code });

        // Filter climate records by from_climate and to_climate
        const fromClimateRecords = climateRecords.filter(record => record.climate === from_climate);
        const toClimateRecords = climateRecords.filter(record => record.climate === to_climate);

        // Area Not Found Error
        if(climateRecords.length==0){
            const areaNotFoundError =  new Error("Area Not Founded");
            areaNotFoundError.name = "AreaNotFoundError"; 
            throw areaNotFoundError;
        }

        // Not Sufficient Data
        if(fromClimateRecords.length==0 || toClimateRecords.length==0){
            const notSufficientError =  new Error("Not Sufficient Data To Calculate");
            notSufficientError.name = "NotSufficientDataError"; 
            throw notSufficientError;
        }


        // Calculate temperature_delta, humidity_delta, and rain_chances_delta
        const calculateDelta = (records, field) => {
            const sumFrom = fromClimateRecords.reduce((total, record) => total + record[field], 0);
            const sumTo = toClimateRecords.reduce((total, record) => total + record[field], 0);
            const numRecords = records.length;
            return numRecords > 0 ? (sumTo - sumFrom) / numRecords : 0;
        };

        const temperature_delta = calculateDelta(toClimateRecords, 'temperature') - calculateDelta(fromClimateRecords, 'temperature');
        const humidity_delta = calculateDelta(toClimateRecords, 'humidity') - calculateDelta(fromClimateRecords, 'humidity');
        const rain_chances_delta = calculateDelta(toClimateRecords, 'chances_of_rain') - calculateDelta(fromClimateRecords, 'chances_of_rain');

        // Calculate climate_delta
        const climate_delta = `${from_climate} -> ${to_climate}`;

        // Calculate climate_change_index
        const climate_change_index = (temperature_delta * humidity_delta) / rain_chances_delta;

        // Create the response object
        const response = {
            climate_delta,
            temperature_delta,
            humidity_delta,
            rain_chances_delta,
            climate_change_index
        };

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }    
}


module.exports = {
    addClimateData,
    getAllRecords,
    getRecordsOfArea,
    getRecordsOfAreaNClimate,
    calculateClimateDelta
}