import React from 'react';
import './MainApp.scss';
import OptionPicker from './OptionPicker';
import Visualisation from './Visualisation';
import SentimentAnalysis from './SentimentAnalysis';
import Prediction from './Prediction';

const MainApp = ({optionName, teamScoreData, teamSentimentData, teamPredictionData}) => {

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