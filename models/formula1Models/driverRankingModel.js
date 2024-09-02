const mongoose = require('mongoose');


const DriverRankingSchema = new mongoose.Schema({
	parameters: {
        season: { type: String, required: true },
    },
    response: [
    	
    	{
    		position:String,
    		driver:{
                id:Number,
                name:String,
                abbr:String,
                number:Number,
                image:String
            },
            team:{
    			id:Number,
    			name:String,
    			logo:String,
    		},
    		points:Number,
            wins:Number,
            behind:Number,
    		season:Number,
    	},
            
    ],
})

const DriverRanking = mongoose.model('Driver Ranking', DriverRankingSchema);

module.exports = DriverRanking;