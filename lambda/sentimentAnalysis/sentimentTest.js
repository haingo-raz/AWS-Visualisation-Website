const AWS = require('aws-sdk');
const comprehend = new AWS.Comprehend({ region: 'us-east-1' });
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

exports.handler = async (event, context) => {
  try {
    // Retrieve the text_content column from the NewsAPI table
    const params = {
      TableName: 'NewsAPI',
      LanguageCode: "en", //english
      ProjectionExpression: 'text_content'
    };
    const result = await docClient.scan(params).promise();
    const articles = result.Items.map(item => item.text_content);

    // Perform sentiment analysis on each article
    const sentimentPromises = articles.map(article =>
      comprehend.detectSentiment({ Text: article }).promise()
    );
    const sentiments = await Promise.all(sentimentPromises);

    // Store the sentiment analysis results in the articleAnalysis table
    const putPromises = sentiments.map((sentiment, index) =>
      docClient.put({
        TableName: 'articleAnalysis',
        LanguageCode: "en",
        Item: {
          article_id: index + 1,
          sentiment: sentiment.Sentiment,
          positive: sentiment.SentimentScore.Positive,
          negative: sentiment.SentimentScore.Negative,
          neutral: sentiment.SentimentScore.Neutral,
          mixed: sentiment.SentimentScore.Mixed
        }
      }).promise()
    );
    await Promise.all(putPromises);

    return {
      statusCode: 200,
      body: 'Sentiment analysis complete'
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: 'Error performing sentiment analysis'
    };
  }
};

//Comment this out if running on AWS Lambda
exports.handler();
