const dotenv = require('dotenv');
const axios = require('axios');
const moment = require('moment');
import { saveNbaData } from "./saveNbaData";

//Interface that defines each team's details
interface TeamInfo {
    id: number,
    full_name: string
}

//Interface that defines match details
interface MatchStats {
    date: string,
    home_team: TeamInfo, 
    home_team_score: number,
    visitor_team: TeamInfo,
    visitor_team_score: number
}

interface FinalResult {
    data: Array<MatchStats>;
}

//Balldontlie base Url
const baseUrl: string = "https://www.balldontlie.io/api/v1/games?";

let seasonStart = 2015;
let seasonEnd = 2021;

//Retrieve match data 
async function getMatchStats(teamId: number): Promise<void> {

    for (let season = seasonStart; season <= seasonEnd; season++){

        //Set the url to download the data
        let url = `${baseUrl}seasons[]=${season}&team_ids[]=${teamId}&per_page=100`;

        try {
            let dataResponse: FinalResult = (await axios.get(url)).data;
            
            //Get the response data
            let results = dataResponse.data;

            results.forEach((result) => {
                //Only takes the score of the team with the provided id
                let score: number = result.home_team.id === teamId ? result.home_team_score : result.visitor_team_score;
                let teamName: string = result.home_team.id === teamId? result.home_team.full_name : result.visitor_team.full_name;

                let matchDate = moment(result.date).format("DD-MM-YYYY");
                //timestamp conversion
                let timestamp: number = +moment(result.date).format("X");

                //Save to dynamoDB table
                //saveNbaData(teamId, matchDate, teamName, timestamp, score, season);

                console.log(score);
            })


        } catch (error) {
            console.log(error);
        }
    }
}

getMatchStats(2);

let teamIds: number[] = [
   14, 
   5,
   11, 
   10, 
   2
]



// function getNumericalData(){
//     for (let x=0; x< teamIds.length; x++){
//       getMatchStats(teamIds[x])
//     }
// }

// getNumericalData()


//Los angeles lakers 14
//Chicago Bulls 5
//Houston Rockets 11
//Golden state warriors10
//Boston Celtics 2