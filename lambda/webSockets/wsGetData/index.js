let ws = require('websocket'); //websocket

/*Contains main handler */

//Hard coded domain name and stage for data broadcasting to connected clients
let domainName = "wss://13kc76hcsa.execute-api.us-east-1.amazonaws.com";
let stage = "prod";

//CUSTOM CHANGE
exports.handler = async (event) => {

    try{
        //Receive team name from client
        let teamName = JSON.parse(event.body).team_name;

        //log received data
        console.log("Received team_name " + teamName);

        //Allocate domain name and stage dynamically
        domainName = event.requestContext.domainName;
        stage = event.requestContext.stage;
        console.log("Domain: " + domainName + " stage: " + stage);

        //send team name, domain url and stage name
        let sendMsgPromises = await ws.getSendMessagePromises(teamName, domainName, stage);

        await Promise.all(sendMsgPromises);
    }
    catch(error){
        return { statusCode: 500, body: "Error: " + JSON.stringify(error) };
    }

    return { statusCode: 200, body: "Data sent successfully." };
};


//Gets the sentiment analysis data for display
/*async function getSentimentData(teamName){

    //Get sentiment data of the selected team 
    const articleText = await db.getSentiment(teamName);

    console.log("sentiment received" + articleText);

    //take dynamoDB Items response
    const articleItems = articleText.Items; 

    let positiveSentiment;
    let negativeSentiment;
    let neutralSentiment;

    let sumPositive = 0
    let sumNegative = 0
    let sumNeutral = 0

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
}*/