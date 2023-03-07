import React from 'react';
import './MainApp.scss';
import OptionPicker from './OptionPicker';
import Visualisation from './Visualisation';
import SentimentAnalysis from './SentimentAnalysis';
import Prediction from './Prediction';

function MainApp(
    {optionName, 
    teamScoreData,
    teamSentimentData,
    teamPredictionData
    }: 
    {optionName: any, 
    teamScoreData: any,
    teamSentimentData: any, 
    teamPredictionData: any
    }) {

    return (
        <div className='mainApp'>
            <OptionPicker/>
            <Visualisation teamOption={optionName} scoreData={teamScoreData}/>
            <Prediction predictionData={teamPredictionData}/>
            <SentimentAnalysis sentimentData={teamSentimentData}/>
        </div>
    );
}

export default MainApp;