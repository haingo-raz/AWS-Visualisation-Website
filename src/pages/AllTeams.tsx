import React from 'react';
import Header from '../components/Header/Header';
import MainApp from '../components/MainApp/MainApp';
import { allTeamsSentimentAnalysis } from '../Tools/Utilities'; //downloaded data
import { predictionData } from '../Tools/Utilities'; //downloaded data
import { scoreData } from '../Tools/Utilities';

function AllTeams() {
    return (
        <div className='App'>
            <Header/>
            <MainApp 
                optionName="All teams" 
                teamScoreData={scoreData} //respective team downloaded data
                teamSentimentData={allTeamsSentimentAnalysis}
                teamPredictionData={predictionData}
            />
        </div>
    );
}

export default AllTeams;