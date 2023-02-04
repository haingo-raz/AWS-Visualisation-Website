import React from 'react';
import './MainApp.scss';
import OptionPicker from './OptionPicker';
import Visualisation from './Visualisation';
import SentimentAnalysis from './SentimentAnalysis';
import Prediction from './Prediction';

function MainApp() {
    return (
        <div className='mainApp'>
            <OptionPicker/>
            <Visualisation/>
            <Prediction/>
            <SentimentAnalysis/>
        </div>
    );
}

export default MainApp;