const mongoose = require('mongoose');


const RaceFixtureSchema = new mongoose.Schema({
	parameters: {
        season: { type: String, required: true },
        type:String
    },
    response: [
    	{
    		id:Number,
    		competition:{
                id:Number,
                name:String,
                location:{
                    country:String,
                    city:String,
                },
            },
            circuit:{
    			id:Number,
    			name:String,
    			image:String,
    		},
    		season:Number,
            type:String,
            laps:{
                current:Number,
                total:Number,
            },
            fastest_lap:{
                driver:{
                    id:Number,
                },
                time:String,
            },
    		distance:String,
            timezone:String,
            date:String,
            weather:String,
            status:String,
    	},
            
    ],
})

const RaceFixture = mongoose.model('Race Fixture', RaceFixtureSchema);

module.exports = RaceFixture;