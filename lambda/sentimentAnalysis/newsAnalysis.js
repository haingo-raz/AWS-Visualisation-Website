
let AWS = require("aws-sdk"); //aws-sdk 

//Create comprehend instance
let comprehend = new AWS.Comprehend();
//Create dynamoDB instance
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    
    for (let record of event.Records) {

        //Handle INSERT request only.
        if (record.eventName === "INSERT") {

            let articleId = record.dynamodb.NewImage.article_id.N;
            let team_name = record.dynamodb.NewImage.team_name.S;
            let articleDate = record.dynamodb.NewImage.published_at.S;
            let articleText = record.dynamodb.NewImage.text.S;

            // Parameters for AWS Comprehend
            let params = {
                LanguageCode: "en", //english
                Text: articleText
            };

            comprehend.detectSentiment(params, (comprehendErr, data) => {
                //error
                if (comprehendErr) {
                    console.log("\nError with call to Comprehend:\n" + JSON.stringify(comprehendErr));
                }
                //success
                else {
                    console.log("\nSuccessful call to Comprehend:\n" + data.SentimentScore.Positive);

                   //sentiment analysis table structure
                    const dbParams = {
                        TableName: 'articleAnalysis',
                        LanguageCode: "en",
                        Item: {
                            id: articleId,
                            team_name: team_name,
                            text: articleText,
                            Positive: data.SentimentScore.Positive,
                            Negative: data.SentimentScore.Negative,
                            Neutral: data.SentimentScore.Neutral,
                            Mixed: data.SentimentScore.Mixed,
                        },
                    };

                     //add sentiment analysis results to dynamoDB table
                    dynamoDB.put(dbParams, (err, data) => {
                        console.log("ATTEMPTING TO ADD");
                        if (err) {
                            console.error("Error JSON:", JSON.stringify(err));
                        }
                        else {
                            console.log("Sentiment analysis added to table:");
                        }
                    });
                }
            });
        }
    }
};

//Comment this out if running on AWS Lambda
exports.handler();
