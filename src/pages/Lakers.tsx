import React from 'react';
import Header from '../components/Header/Header';
import MainApp from '../components/MainApp/MainApp';
import { lakersSentimentAnalysis } from '../Tools/Utilities';

function Lakers() {
    return (
        <div className='App'>
            <Header/>
            <MainApp 
                optionName="Los Angeles Lakers" 
                teamSentimentData={lakersSentimentAnalysis }
            />
        </div>
    );
}

export default Lakers;