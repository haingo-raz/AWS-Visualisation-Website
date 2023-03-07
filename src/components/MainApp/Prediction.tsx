import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Prediction.scss';
import { CustomizedHighScoreDot, CustomizedLowestScoreDot } from '../../Tools/Utilities';

function Prediction({predictionData}: {predictionData:any}) {
    return (
        <div className='prediction'>
            <h1 className='title'>Prediction</h1>
            
            <div className="graphSection">
                <div className='graph'>
                    <ResponsiveContainer width="100%" height="100%">        
                        <LineChart
                            width={500}
                            height={300}
                            data={predictionData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                            >          
                            <CartesianGrid strokeDasharray="3 3" />          
                            <XAxis dataKey="year" />  {/*year*/}        
                            <YAxis />          
                            <Tooltip />          
                            <Legend />          
                            <Line type="monotone" dataKey="highScore" stroke="#8884d8" dot={<CustomizedHighScoreDot />} />          
                            <Line type="monotone" dataKey="lowScore" stroke="#82ca9d" dot={<CustomizedLowestScoreDot />}/>        
                        </LineChart>      
                    </ResponsiveContainer>
                </div>
            </div>     
        </div>
    );
}

export default Prediction;