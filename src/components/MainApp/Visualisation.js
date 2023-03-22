import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Visualisation.scss';
import { CustomizedHighScoreDot, CustomizedLowestScoreDot } from '../../Tools/Utilities';
//import { scoreData } from '../../Tools/Utilities';

function Visualisation({teamOption, scoreData}: {teamOption: any, scoreData: any}) {
    return (
        <div className='visualisation'>
            <h1 className='title'>Visualisation: <span>{teamOption}</span></h1>
            {/* Graph */}
            <div className="graphSection">
                <div className='graph'>
                    <ResponsiveContainer width="100%" height="100%">        
                        <LineChart
                            width={500}
                            height={300}
                            data={scoreData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                            >          
                            <CartesianGrid strokeDasharray="3 3" />          
                            <XAxis dataKey="matchDate" />          
                            <YAxis />          
                            <Tooltip />          
                            <Legend />          
                            <Line type="monotone" dataKey="score" stroke="#8884d8" dot={<CustomizedHighScoreDot />} />          
                            {/* <Line type="monotone" dataKey="lowScore" stroke="#82ca9d" dot={<CustomizedLowestScoreDot />}/>         */}
                        </LineChart>      
                    </ResponsiveContainer>
                </div>
            </div>      
        </div>
    );
}

export default Visualisation;