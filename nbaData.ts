const dotenv = require('dotenv');
const axios = require('axios');
const moment = require('moment');

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

let seasonStart = 2020;
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

            
            let scoreList: number[] = [];

            results.forEach((result) => {
                let score: number = result.home_team.id === teamId ? result.home_team_score : result.visitor_team_score;
                scoreList.push(score);
            })

            console.log(scoreList);

        } catch (error) {
            console.log(error);
        }
    }
}

getMatchStats(2);


