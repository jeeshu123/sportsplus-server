const mongoose = require("mongoose");
const Fixture = require("./../models/fixtureModel");
const League = require("./../models/standingModel");

const saveFixtures = async (data) => {
  try {
    const fixtureData = new Fixture({
      get: data.get,
      parameters: data.parameters,
      response: data.response,
    });

    await fixtureData.save();
  } catch (error) {
    console.error("Error saving fixtures:", error);
  }
};

const saveStandings = async (data) => {
  try {
    console.log(data);
    const leagueData = new League({
      id: data.id,
      name: data.name,
      country: data.country,
      logo: data.logo,
      flag: data.flag,
      season: data.season,
      standings: data.standings,
    });

    await leagueData.save();
    console.log("Standings saved successfully.");
  } catch (error) {
    console.error("Error saving standings:", error);
  }
};

const getFixtures = async (req, res) => {
  try {
    const { league, season } = req.query;
    const existingFixtures = await Fixture.findOne({
      "parameters.league": league,
      "parameters.season": season,
    });

    if (
      existingFixtures &&
      existingFixtures.response.length > 0 &&
      season !== "2024"
    ) {
      return res.json(existingFixtures.response);
    }

    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures?season=${season}&league=${league}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": "6d5e8a2097fc50558c88434bf8d0fd29",
          "x-rapidapi-host": "v3.football.api-sports.io",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    await saveFixtures(data);

    res.json(data.response);
    // res.json({message:"failed"})
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getStandings = async (req, res) => {
  try {
    const { league, season } = req.query;
    const existingStanding = await League.findOne({
      id: league,
      season: season,
    });

    if (existingStanding) {
      return res.json(existingStanding);
    }

    const response = await fetch(
      `https://v3.football.api-sports.io/standings?league=${league}&season=${season}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": "6d5e8a2097fc50558c88434bf8d0fd29",
          "x-rapidapi-host": "v3.football.api-sports.io",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    if (!data.response.at(0).league) {
      res.status(400).json({ message: "Could not load Data" });
    }
    const cleanedData = {
      id: data.response.at(0).league.id,
      name: data.response.at(0).league.name,
      country: data.response.at(0).league.country,
      logo: data.response.at(0).league.logo,
      flag: data.response.at(0).league.flag,
      season: data.response.at(0).league.season,
      standings: data.response.at(0).league.standings.at(0),
    };

    await saveStandings(cleanedData);
    res.json(cleanedData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getFixtures, getStandings };
