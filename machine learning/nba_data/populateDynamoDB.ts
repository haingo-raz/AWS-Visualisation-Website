import { savePredictionData } from "./savePredictionData";
const moment = require('moment');

//pull predictions json file


//Retrieve match data 
async function populatePredictions(teamName: string): Promise<void> {

    let teamNames: string[] = [
        "Los Angeles Lakers", 
        "Boston Celtics", 
        "Houston Rockets",
        "Chicago Bulls", 
        "Golden State Warriors"
    ];

    let startDates = [

    ]

    //for each team, populate the table
    for (let count: number = 0; count < teamNames.length; count++) {

        //require the json file
        let predictionData = require('./predictions/' + teamNames[count] + '_prediction.json');

        let team_name: string = teamName[count];
        //let timestamp: string = 
        let mean: number = predictionData.mean.S;
        let upper: number = predictionData.upper.S;
        let lower: number = predictionData.lower.S;

        //timestamps[0]

        //handle the x axis: date / timestamps (50 data points)
        //for loop 

        //save to dynamoDB table 
        //savePredictionData(team_name, timestamp, mean, upper, lower);
        
    }
}


//call populate predictions function 


