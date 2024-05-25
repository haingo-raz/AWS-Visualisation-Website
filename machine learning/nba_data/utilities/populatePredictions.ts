import { savePredictionData } from "./savePredictionData";
const moment = require('moment');

//Retrieve match data 
async function populatePredictions(): Promise<void> {

    let teamNames: string[] = [
        "Lakers", 
        "Celtics", 
        "Rockets",
        "Bulls", 
        "Warriors"
    ];

    //the following 2 dates after the last day from each visualisation graph
    let startDates = [
        "12-04-2022",
        "29-05-2022",
        "12-04-2022",
        "29-04-2022",
        "04-06-2022"
    ]

    //for each team, populate the table
    for (let count: number = 0; count < teamNames.length; count++) {

        //require the json file
        let predictionData = require('./predictions/' + teamNames[count] + '_prediction.json');
        

        let team_name: string = predictionData.predictions[0].label;
        let quantiles = predictionData.predictions[0].quantiles;


        let timestamp: string;
        // let mean: number[] = predictionData.predictions[0].mean;
        // let upper: number[] = predictionData.predictions[0].quantiles["0.9"];
        // let lower: number[] = predictionData.predictions[0].quantiles["0.1"];

        let mean: number;
        let upper: number;
        let lower: number;

        
        //handle the x axis: date / timestamps (50 data points) in a for loop 
        for (let x = 0; x < 100; x += 2) {    

            let date = moment(startDates[count], "DD-MM-YYYY").add(x, "days");
            timestamp = date.format("DD-MM-YYYY");

            //loop through the 50 prediction values
            for (let i = 0; i < 50; i++) {
                mean = predictionData.predictions[0].mean[i];
                upper = predictionData.predictions[0].quantiles["0.9"][i];
                lower = predictionData.predictions[0].quantiles["0.1"][i];

                //save to dynamoDB table 
                savePredictionData(team_name, timestamp, mean, upper, lower); 
            }       
        }                  
    }
}


//call populate predictions function 
populatePredictions()