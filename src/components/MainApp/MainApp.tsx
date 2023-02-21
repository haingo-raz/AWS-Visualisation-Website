import React from 'react';
import './MainApp.scss';
import OptionPicker from './OptionPicker';
import Visualisation from './Visualisation';
import SentimentAnalysis from './SentimentAnalysis';
import Prediction from './Prediction';

function MainApp({optionName, teamSentimentData}: {optionName: any, teamSentimentData: any}) {
    return (
        <div className='mainApp'>
            <OptionPicker/>
            <Visualisation teamOption={optionName}/>
            <Prediction/>
            <SentimentAnalysis sentimentData={teamSentimentData}/>
        </div>
    );
}

export default MainApp;