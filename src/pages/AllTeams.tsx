import React from 'react';
import Header from '../components/Header/Header';
import MainApp from '../components/MainApp/MainApp';
import { allTeamsSentimentAnalysis } from '../Tools/Utilities';

function AllTeams() {
    return (
        <div className='App'>
            <Header/>
            <MainApp 
                optionName="All teams" 
                teamSentimentData={allTeamsSentimentAnalysis}
            />
        </div>
    );
}

export default AllTeams;