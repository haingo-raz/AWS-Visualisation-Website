import React, {useState, useEffect} from 'react';
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


//open websocket connection
let connection = new WebSocket("wss://13kc76hcsa.execute-api.us-east-1.amazonaws.com/prod");

function App() {

  //selected team
  const [activeTeamOption, setActiveTeamOption] = useState('Los Angeles Lakers');
  //hold the score data of teams 
  const [teamScores, setTeamScores] = useState([]); 
  //hold the sentiment data of the teams
  const [sentimentData, setSentimentData] = useState([]);

    //current team chosen
    useEffect(() => {
        console.log("Team state updated to:", activeTeamOption);
    }, [activeTeamOption]);


    //Web Socket handling
    useEffect(() => {

        //log event upon open connection 
        connection.onopen = function (event) {
            console.log("Connected: " + JSON.stringify(event));
        } 

    }, []);

    //upon message receival from server
    connection.onmessage = function (msg) {

        console.log(" Hello from server");

        //Receive message back from server
        let data = JSON.parse(msg.data); 

        //get the nba score
        let nbaScore = data[0].Items;
    
        console.log("Received data" + JSON.stringify(nbaScore)); //error round here

        //handle nba data 

        //handle predictions data 
        

        //handle sentiment data 
    }

    //case connection error
    connection.onerror = function (error) {
        console.log("WebSocket Error: " + JSON.stringify(error));
    }

    //function called upon selecting a team 
    const handleOption = (teamOption) => {
        //change team name display
        setActiveTeamOption(teamOption);

        handleData('all'); //take data from all the table
    }


  const handleData = () => {

    let msgObject = {
      action: "getData", //API Gateway route
      team_name: activeTeamOption //selected team
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
              {/* <button className='teams' onClick={() => handleOption('All teams', 'all')}>All teams</button> */}
              <button className='teams' onClick={() => handleOption('Los Angeles Lakers')}>Los Angeles Lakers</button>
              <button className='teams' onClick={() => handleOption('Houston Rockets')}>Houston Rockets</button>
              <button className='teams' onClick={() => handleOption('Chicago Bulls')}>Chicago Bull</button>
              <button className='teams' onClick={() => handleOption('Golden State Warriors')}>Golden State Warriors</button>
              <button className='teams' onClick={() => handleOption('Boston Celtics')}>Boston Celtics</button>
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
                        </LineChart>      
                    </ResponsiveContainer>
                </div>
            </div>      
          </div>  


          {/* Prediction visualisation */}
          {/* <div className='prediction'>
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
                            <XAxis dataKey="year" />          
                            <YAxis />          
                            <Tooltip />          
                            <Legend />          
                            <Line type="monotone" dataKey="score" stroke="#8884d8" dot={<CustomizedHighScoreDot />} />                 
                        </LineChart>      
                    </ResponsiveContainer>
                </div>
            </div>     
          </div> */}

          {/* Sentiment Analysis */}
          {/* <div className='sentimentAnalysis'>
            <h1 className='title'>Sentiment Analysis</h1>

           
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
          </div> */}

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