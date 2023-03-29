import React, {useState, useEffect} from 'react';
import './App.scss';
import './components/MainApp/OptionPicker.scss';
import './components/MainApp/MainApp.scss';
import './components/MainApp/Prediction.scss';
import './components/MainApp/SentimentAnalysis.scss';
import './components/MainApp/Visualisation.scss';
import Header from './components/Header/Header';
import { PieChart, Pie, Cell, ResponsiveContainer} from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


import { predictionData } from './Tools/Utilities';


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

        //console.log(JSON.stringify(data));

        //get the nba score
        let nbaScore = data[0].Items;
    
        //console.log("Received data" + JSON.stringify(nbaScore)); //received

        //filter data
        const newTeamScore = nbaScore.map((score) => {
            return { score: score.score, match_date: score.match_date };
        });

        //Sort dates from old to recent
        newTeamScore.sort((a, b) => {
            const dateA = new Date(a.match_date.split("-").reverse().join("-"));
            const dateB = new Date(b.match_date.split("-").reverse().join("-"));
            return dateA - dateB;
        });

        setTeamScores(newTeamScore);

        //handle predictions data 
        

        //handle sentiment data 
        let sentimentResults = data[1].Items;

        //filter to only team_name and sentiment type
        const newSentimentResults = sentimentResults.map((sentiment) => {
            return { team_name: sentiment.team_name, positive: sentiment.positive, negative: sentiment.negative, neutral: sentiment.neutral };
        });

        //Sentiment *1000

        const teamSentimentAnalysis = newSentimentResults.reduce((result, item) => {
            result[0].value += item.positive;
            result[1].value += item.negative;
            result[2].value += item.neutral;
            return result;
        }, [
            { name: 'Positive', value: 0 },
            { name: 'Negative', value: 0 },
            { name: 'Neutral', value: 0 },
          ])
          .map(item => ({ ...item, value: Math.round(item.value / newSentimentResults.length * 1000) }));

          
        setSentimentData(teamSentimentAnalysis);

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
                                data={teamScores}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                                >          
                                <CartesianGrid strokeDasharray="3 3" />          
                                <XAxis dataKey="match_date" />          
                                <YAxis />          
                                <Tooltip />          
                                <Legend />          
                                <Line type="monotone" dataKey="score" stroke="#8884d8"/>          
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
                            <XAxis dataKey="matchDate" />          
                            <YAxis />          
                            <Tooltip />          
                            <Legend />          
                            <Line type="monotone" dataKey="score" stroke="#8884d8"/>                 
                        </LineChart>      
                    </ResponsiveContainer>
                    </div>
                </div>     
            </div> 

        {/* Sentiment Analysis */}
        <div className='sentimentAnalysis'>
            <h1 className='title'>Sentiment Analysis</h1>

           
            <div className="graphSection">
                <div className="graph">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Legend verticalAlign="top" height={36}/>
                            <Pie
                                data={sentimentData}
                                cx="50%"
                                cy="50%"
                                labelLine={true}
                                label
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey={sentimentData.value}
                                nameKey={sentimentData.name}
                            >
                                {sentimentData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <h3 className="teamName">{activeTeamOption}</h3>
                <p className="graphDescription">Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur</p>
            </div> 
          </div> 
        </div>
    </div>
  );
}

export default App;


//colors used on the sentiment analysis chart POSITIVE, NEGATIVE, NEUTRAL
const COLORS = ['#6ce5e8','#DE3163', '#ccc'];




