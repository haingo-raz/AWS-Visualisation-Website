let AWS = require("aws-sdk");

//Create dynamoDB instance
const dynamoDB = new AWS.DynamoDB.DocumentClient();
//Create instance of Comprehend
let comprehend = new AWS.Comprehend();

exports.handler = async (event) => {
    try{
        //Iterate through event records
        for (let i=0; i<event.Records.length; i++){

            let record = event.Records[i];    

            let articleId = record.dynamodb.NewImage.article_id.N;
            console.log("Article ID: " + articleId);
            
            let articleText = record.dynamodb.NewImage.text_content.S;
            console.log("Article text: " + articleText);
        
            let team_name = record.dynamodb.NewImage.team_name.S;
            console.log("Team name: " + team_name);
            
            let timestamp = record.dynamodb.NewImage.timestamp.N;
            console.log("timestamp: " + timestamp);
           
            //AWS Comprehend parameters
            let params = {
                LanguageCode: "en", //Possible values include: "en", "es", "fr", "de", "it", "pt"
                Text: articleText //perform sentiment analysis on the content of the article
            };
            
            //perform sentiment analysis operation
            let result = await comprehend.detectSentiment(params).promise();
            console.log(JSON.stringify(result));
        
            params = {
                TableName: "articleAnalysis",
                Item: {
                    id: parseInt(articleId),
                    team_name: team_name,
                    timestamp: timestamp,
                    positive: result.SentimentScore.Positive, 
                    negative: result.SentimentScore.Negative,  
                    neutral: result.SentimentScore.Neutral  
                }
            };
    
       
            result = await dynamoDB.put(params).promise();
            console.log(JSON.stringify(result));
            console.log("Sentiment analysis stored");
       }
    }
    catch(err){
        console.error(JSON.stringify(err));
    }
}