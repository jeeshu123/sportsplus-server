const mongoose = require('mongoose');


const ConstructorRankingSchema = new mongoose.Schema({
	parameters: {
        season: { type: String, required: true },
    },
    response: [
    	
    	{
    		position:String,
    		team:{
    			id:Number,
    			name:String,
    			logo:String,
    		},
    		points:Number,
    		season:Number,
    	},
            
    ],
})

const ConstructorRanking = mongoose.model('Constructor Ranking', ConstructorRankingSchema);

module.exports = ConstructorRanking;