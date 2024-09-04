const mongoose = require('mongoose');

const RaceFixtureSchema = new mongoose.Schema({
	parameters: {
        season: { type: Number, required: true },
        type: { type: String, required: true }
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
            type:{ type: String, required: true },
            laps:{
                current:{ type: Number, default: null },
                total:Number,
            },
            fastest_lap:{
                driver:{
                    id:{ type: Number, default: null },
                },
                time:{ type: String, default: null },
            },
    		distance:String,
            timezone:String,
            date:String,
            weather:{ type: String, default: null },
            status:String,
            flag:{ type: String, default: null}
    	}
            
    ]
})

const RaceFixture = mongoose.model('Race Fixture', RaceFixtureSchema);

module.exports = RaceFixture;
