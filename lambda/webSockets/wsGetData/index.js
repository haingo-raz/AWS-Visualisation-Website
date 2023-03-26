let ws = require('websocket'); //websocket
let db = require("database"); //database functions

/*Contains main handler */
/*Graph ploting happens here*/

//Hard coded domain name and stage for data broadcasting to connected clients
let domainName = "wss://13kc76hcsa.execute-api.us-east-1.amazonaws.com/";
let stage = "prod";

//CUSTOM CHANGE
exports.handler = async (event) => {

    console.log(JSON.stringify(event));

    try {
        let msg;

        //Records upon change to NBA table
        if (event.Records !== undefined) {
        msg = {
            type: "UPDATE"
        };
        
        for (let record of event.Records) {
           
            //change within the table
            if (record.eventName === "INSERT" || record.eventName === "REMOVE") {
                let tableName = record.eventSourceARN.split(':')[5].split('/')[1];
                if (msg.table_name === undefined)
                    msg.table_name = tableName;
                else
                    msg.table_name = "all";
            }
        }

        /* send the name of the table that was updated back to the user */
        let sendMsgPromises = await ws.getSendMessagePromises(JSON.stringify(msg), domainName, stage);

        await Promise.all(sendMsgPromises);

        } else {

            //load data
            msg = {
                type: "LOAD"
            };

            //what is this and where is this from? ??????????????????????????????????????????
            let teamName = JSON.parse(event.body).team_name;
            let tableName = JSON.parse(event.body).table_name;

            //retrieve data numerical data from NBA
            /*if (tableName === "NBA" || tableName === "all") {
                msg.match_data = await getNbaScore(teamName);
                msg.prediction_data = (await db.getPredictions(teamName)).Items[0];
            }*/

            //retrieve sentiment analysis data
            if (tableName === "articleAnalysis" || tableName === "all")
                msg.sentiment_data = await getSentimentData(teamName);

            msg.table_name = tableName;
            msg.team_name = teamName;

            /* send retrieved data back to the user */
            let sendMsgPromises = await ws.getSendMessagePromises(msg, domainName, stage);

            await Promise.all(sendMsgPromises);
        }

    } catch (error) {
        return { statusCode: 500, body: "Error: " + JSON.stringify(error) };
    }

    return { statusCode: 200, body: "Data sent successfully." };
};

/*Sentiment analysis operation required*/

//Gets the sentiment analysis data for display
async function getSentimentData(teamName){

    //Get sentiment data of the selected team 
    const articleText = await db.getSentiment(teamName);

    console.log(articleText);

    //take dynamoDB Items response
    const articleItems = articleText.Items; 
    const dataLenght = articleText.ScannedCount; //number of items returned

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