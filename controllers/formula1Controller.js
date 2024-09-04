const mongoose = require('mongoose');
const ConstructorRankings = require('./../models/formula1Models/constructorRankingModel');
const DriverRankings = require('./../models/formula1Models/driverRankingModel');
const RaceFixture = require('./../models/formula1Models/raceFixtureModel');

const saveConstructorRanking = async (data) => {
    try {
        const constructorRankingsData = new ConstructorRankings({
            parameters: data.parameters,
            response: data.response,
        });

        await constructorRankingsData.save();
    } catch (error) {
        console.error('Error saving constructor rankings:', error);
    }
};

const saveDriverRanking = async (data) => {
    try {
        const driverRankingsData = new DriverRankings({
            parameters: data.parameters,
            response: data.response,
        });

        await driverRankingsData.save();
    } catch (error) {
        console.error('Error saving driver rankings:', error);
    }
};

const saveRaceFixture = async (data) => {
    try {
        const raceFixtureData = new RaceFixture({
            parameters: data.parameters,
            response: data.response,
        });

        await raceFixtureData.save();
    } catch (error) {
        console.error('Error saving race fixture:', error);
    }
};

const getConstructorRankings = async (req,res)=>{
	try{

		const existingConstructorRanking = await ConstructorRankings.findOne({
            'parameters.season': '2023',
            // 'season': '2023'
        });

        if (existingConstructorRanking) {
            return res.json(existingConstructorRanking);
        }

		const response = await fetch(
            `https://v1.formula-1.api-sports.io/rankings/teams?season=2023`,
            {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '6d5e8a2097fc50558c88434bf8d0fd29',
                    'x-rapidapi-host': 'v1.formula-1.api-sports.io',
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }



        const data = await response.json();

        await saveConstructorRanking(data)

        res.json(data)


	} catch(error){
		res.status(400).json({message:error})
	}
}

const getDriverRankings = async (req,res)=>{
	try{

		const existingDriverRanking = await DriverRankings.findOne({
            'parameters.season': '2023',
            // 'season': '2023'
        });

        if (existingDriverRanking) {
            return res.json(existingDriverRanking);
        }

		const response = await fetch(
            `https://v1.formula-1.api-sports.io/rankings/drivers?season=2023`,
            {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '6d5e8a2097fc50558c88434bf8d0fd29',
                    'x-rapidapi-host': 'v1.formula-1.api-sports.io',
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }



        const data = await response.json();

        await saveDriverRanking(data)

        res.json(data)


	} catch(error){
		res.status(400).json({message:error})
	}
}

const getRaceFixtures = async (req,res)=>{
	try{
        	const {season} = req.query;
        	const existingRaceFixtures = await RaceFixture.findOne({
            		'parameters.type': "race",
            		'parameters.season': season
        	});

        	if (existingRaceFixtures) {
            		// console.log("Found")
            		return res.json(existingRaceFixtures);
        	}
		
		const response = await fetch(
            `https://v1.formula-1.api-sports.io/races?season=${season}&type=race`,
            {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '6d5e8a2097fc50558c88434bf8d0fd29',
                    'x-rapidapi-host': 'v1.formula-1.api-sports.io',
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        data.response = await Promise.all(
            data.response.map(async (race) => {
                const country = race.competition.location.country;
                if (!country) return race;

                async function fetchLogo(country) {
                    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
                    const data = await res.json();
                    if (data && data.length > 0) return data[0].flags.png;
                    return null;
                }

                const flag = await fetchLogo(country);

                return { ...race, flag };
            })
        );

        await saveRaceFixture(data)

        res.json(data)
	} catch(error){
		res.status(400).json({message:error})
	}
}


module.exports = { getConstructorRankings,getDriverRankings, getRaceFixtures };
