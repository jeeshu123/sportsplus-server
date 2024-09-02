const mongoose = require('mongoose');

const goalsSchema = new mongoose.Schema({
  for: Number,
  against: Number
});

const performanceSchema = new mongoose.Schema({
  played: Number,
  win: Number,
  draw: Number,
  lose: Number,
  goals: goalsSchema
});

const teamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  logo: String
});

const standingSchema = new mongoose.Schema({
  rank: Number,
  team: teamSchema,
  points: Number,
  goalsDiff: Number,
  group: String,
  form: String,
  status: String,
  description: String,
  all: performanceSchema,
  home: performanceSchema,
  away: performanceSchema,
  update: String
});

const leagueSchema = new mongoose.Schema({
  id: Number,
  name: String,
  country: String,
  logo: String,
  flag: String,
  season: Number,
  standings: [standingSchema]
});

const League = mongoose.model('League', leagueSchema);

module.exports = League;
