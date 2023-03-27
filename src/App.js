import React, {useState} from 'react';
import { Route, Routes, NavLink, Link } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import MainApp from './components/MainApp/MainApp';
import { PieChart, Pie, Cell, ResponsiveContainer} from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CustomizedHighScoreDot} from './Tools/Utilities';
import { allTeamsSentimentAnalysis } from './Tools/Utilities';
import { predictionData } from './Tools/Utilities';
import { scoreData } from './Tools/Utilities';

function App() {

  const [activeTeamOption, setActiveTeamOption] = useState('All teams');
  const [sentimentData, setSentimentData] = useState([]);

  //Web Socket handling 
  //open websocket connection
  let connection = new WebSocket("wss://13kc76hcsa.execute-api.us-east-1.amazonaws.com/prod");

  //log event upon open connection 
  connection.onopen = function (event) {
      console.log("Connected: " + JSON.stringify(event));
  };

  //case connection error
  connection.onerror = function (error) {
      console.log("WebSocket Error: " + JSON.stringify(error));
  }

  //upon message receival from server
  connection.onmessage = function (msg) {

      console.log(msg);

      let data = JSON.stringify(msg.data);

      console.log("Received data" + data);

  //     //update NBA graph
  //     /*if (data.team_name == teamOption && 
  //         (data.table_name === "NBA" || data.table_name === "all")) {

  //         //create NBA visualisation   
  //         getNbaLabels(data);
  //     }*/

      //console.log(activeTeamOption);

      //Update sentiment data chart 
    
        let sentimentData = data.sentiment_data;
        let positiveData = sentimentData.positive;
        let negativeData = sentimentData.negative;
        let neutralData = sentimentData.neutral;

        console.log(sentimentData);

        //Get sentiment data for selected team
        const sentimentAnalysis = [
            { name: 'Positive', value: 400 },
            { name: 'Negative', value: 300 },
            { name: 'Neutral', value: 300 }
        ];

        setSentimentData(sentimentAnalysis);

        console.log(sentimentData);
    }

    //function called upon selecting a team 
    const handleOption = (teamOption) => {

    //change team name display
    setActiveTeamOption(teamOption);
          
    handleData('all'); //take data from all the table
  }


  const handleData = (tableName) => {

    let msgObject = {
      action: "getData", //API Gateway route
      team_name: activeTeamOption,
      table_name: tableName //Table name 
    };

    //send the message to the connection
    connection.send(JSON.stringify(msgObject));

    console.log("Message sent: " + JSON.stringify(msgObject));
  } 


  return (
    <div className="App">
        <Header/>
        
        <div className='mainApp'>
            
          {/* Option picker */}
          <div className="optionPicker">
              <button className='teams' onClick={() => handleOption('All teams', 'all')}>All teams</button>
              <button className='teams' onClick={() => handleOption('Los Angeles Lakers', 'all')}>Los Angeles Lakers</button>
              <button className='teams' onClick={() => handleOption('Houston Rockets', 'all')}>Houston Rockets</button>
              <button className='teams' onClick={() => handleOption('Chicago Bulls', 'all')}>Chicago Bull</button>
              <button className='teams' onClick={() => handleOption('Golden State Warriors', 'all')}>Golden State Warriors</button>
              <button className='teams' onClick={() => handleOption('Boston Celtics', 'all')}>Boston Celtics</button>
          </div>

        {/* Historical data visualisation */}
          <div className='visualisation'>
            <h1 className='title'>Visualisation: <span>{activeTeamOption}</span></h1>
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


          {/* Prediction visualisation */}
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
                            <XAxis dataKey="year" />  {/*year?????*/}        
                            <YAxis />          
                            <Tooltip />          
                            <Legend />          
                            <Line type="monotone" dataKey="score" stroke="#8884d8" dot={<CustomizedHighScoreDot />} />                 
                        </LineChart>      
                    </ResponsiveContainer>
                </div>
            </div>     
          </div>

          {/* Sentiment Analysis */}
          <div className='sentimentAnalysis'>
            <h1 className='title'>Sentiment Analysis</h1>

            {/* Graph */}
            <div className="graphSection">
                <div className="graph">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie
                                data={sentimentData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                //label
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey={sentimentData.value}
                            >
                                {sentimentData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <h3 className="teamName">Team name</h3>
                <p className="graphDescription">Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur</p>
            </div> 
          </div>

        </div>
    </div>
  );
}

export default App;



//colors used on the sentiment analysis chart 
const COLORS = ['#41b8d5', '#31356e', '#6ce5e8'];


const RADIAN = Math.PI / 180;

//sentiment analysis chart label
const renderCustomizedLabel = (cx , cy, midAngle, innerRadius, outerRadius, percent, index) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
  );
};