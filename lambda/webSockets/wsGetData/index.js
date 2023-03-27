let ws = require('websocket'); //websocket
let db = require("database"); //database functions

/*Contains main handler */

//Hard coded domain name and stage for data broadcasting to connected clients
let domainName = "13kc76hcsa.execute-api.us-east-1.amazonaws.com";
let stage = "prod";

//CUSTOM CHANGE
exports.handler = async (event) => {

    console.log(JSON.stringify(event));

    //Receive team name and table name from client
    let teamName = JSON.parse(event.body).team_name;
    let tableName = JSON.parse(event.body).table_name;

    try{

        let msg;

        msg = {
            type: "LOAD"
        };

        //Get sentiment analysis data
        msg.sentiment_data = await getSentimentData(teamName); //grab the sentiment analysis data

        //console.log("Team sentiment data: " + JSON.stringify(msg.sentiment_data));

        //send data back to client
        let sendMsgPromises = await ws.getSendMessagePromises(msg, domainName, stage);

        await Promise.all(sendMsgPromises);
    }
    catch(error){

    }


    //Log the event 
    console.log("Event details :" + JSON.stringify(event));
};


//Gets the sentiment analysis data for display
async function getSentimentData(teamName){

    //Get sentiment data of the selected team 
    const articleText = await db.getSentiment(teamName);

    console.log("sentiment received" + articleText);

    //take dynamoDB Items response
    const articleItems = articleText.Items; 

    let positiveSentiment;
    let negativeSentiment;
    let neutralSentiment;

    var sumPositive = 0
    var sumNegative = 0
    var sumNeutral = 0

    //Loop through all the table rows to calculate sentiment data (positive, negative, neutral)
    for (let i = 0; i < articleItems.length; i++) {

        sumPositive += sumPositive + articleItems[i].positive;
        positiveSentiment = (sumPositive / articleItems.length) * 1000; //find the average out of 1000

        sumNegative += sumNegative + articleItems[i].negative;
        negativeSentiment = (sumNegative / articleItems.length) * 1000; //find the average out of 1000

        sumNeutral += sumNeutral + articleItems[i].neutral;
        neutralSentiment = (sumNeutral / articleItems.length) * 1000; //find the average out of 1000
    }

    //Send this to client 
    let sentimentData = {
        team_name : teamName,
        positive: positiveSentiment,
        negative: negativeSentiment,
        neutral: neutralSentiment
    };

    console.log("Sentiment results" + sentimentData);

    return sentimentData;
}


//Gets the NBA score for display 
/*async function getNbaScore(teamName) {

    //get the match data for the current team from the database
    const data = await db.getScore(teamName);

    const items = data.Items;

    console.log("Items: " + JSON.stringify(items));
  
    let timestamps = [];
    let matchDates = [];
    let score = [];

    //put the match data into simple arrays 
    for (let i = 0; i < items.length; i++) {
        timestamps[i] = items[i].timestamp;
        matchDates[i] = items[i].match_date;
        score[i] = items[i].score;
    }

    //put the data into a data structure for the front end 
    let NBAData = {
        team_name: teamName,
        timestamps: timestamps,
        match_dates: matchDates,
        score: score
    };

    return NBAData;
}*/