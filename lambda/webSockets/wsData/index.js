//Import external library with websocket functions
let ws = require('websocket');
let db = require("database");

/**Contains main handler */

//Hard coded domain name and stage to broadcast data to connected clients
//let domainName = "wss://2vn1tu4oo8.execute-api.us-east-1.amazonaws.com"; //custom API link
let domainName = "";
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
        }
        for (let record of event.Records) {
            /* if the event occured because of a new table insert or a remove, 
            set the table name to that tables name */
            if (record.eventName === "INSERT" || record.eventName === "REMOVE") {
                let tableName = record.eventSourceARN.split(':')[5].split('/')[1];
                if (msg.table_name === undefined)
                    msg.table_name = tableName;
                else
                    msg.table_name = "all";
            }
        }

        /* send the name of the table that was updated back to the user */
        let sendMsgPromises = await ws.getSendMessagePromises(msg, domainName, stage);

        await Promise.all(sendMsgPromises);

        } else {

            /* set the message type to LOAD, for loading the data */
            msg = {
                type: "LOAD"
            };

            let teamName = JSON.parse(event.body).team_name;
            let tableName = JSON.parse(event.body).table_name;

            //retrieve data on NBA table request 
            if (tableName === "NBA" || tableName === "all") {
                msg.match_data = await getNbaScore(teamName);
                msg.prediction_data = (await db.getArticleText(teamName)).Items[0];
            }

            //retrieve sentiment analysis table
            if (tableName === "articleAnalysis" || tableName === "all")
                msg.sentiment_data = await getArticleText(teamName);

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
async function getArticleText(teamName){

    //Get sentiment data of the selected team 
    const articleText = await db.getSentiment(teamName);
    console.log(articleText);

    const articleItems = articleText.Items;

    let articleTimestamps = [];
    let positiveSentiment = [];
    let negativeSentiment = [];
    let neutralSentiment = [];

    /* put the sentiment data into simple arrays */
    for (let i = 0; i < articleItems.length; i++) {
        articleTimestamps[i] = articleItems[i].timestamp;
        positiveSentiment[i] = articleItems[i].sentiment.SentimentScore.Positive;
        negativeSentiment[i] = articleItems[i].sentiment.SentimentScore.Negative;
        neutralSentiment[i] = articleItems[i].sentiment.SentimentScore.Neutral;
    }

    //Data structure for frontent
    let sentimentData = {
        team_name : teamName,
        timestamp: articleTimestamps,
        positive: positiveSentiment,
        negative: negativeSentiment,
        neutral: neutralSentiment
    };

    return sentimentData;
}


//Gets the NBA score for display 
async function getNbaScore(teamName) {

    /* get the match data for the current team from the database */
    const data = await db.getScore(teamName);

    const items = data.Items;

    console.log("Items: " + JSON.stringify(items));
  
    let timestamps = [];
    let matchDates = [];
    let score = [];

    /* put the match data into simple arrays */
    for (let i = 0; i < items.length; i++) {
        timestamps[i] = items[i].timestamp;
        matchDates[i] = items[i].match_date;
        score[i] = items[i].score;
    }

    /* put the data into a data structure for the front end */
    let NBAData = {
        team_name: teamName,
        timestamps: timestamps,
        match_dates: matchDates,
        score: score
    };

    return NBAData;
}