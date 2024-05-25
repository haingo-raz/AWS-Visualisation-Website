"use strict";
exports.__esModule = true;
exports.saveArticle = void 0;
var AWS = require("aws-sdk");
//AWS Configuration
AWS.config.update({
    region: "us-east-1"
});
//Create instance of AWS SDK
var documentClient = new AWS.DynamoDB.DocumentClient();
/* Function returns a Promise that will save the text with the specified id. */
function saveArticle(articleId, teamName, timestamp, publishDate, articleText) {
    //DynamoDB parameters
    var params = {
        TableName: "NewsAPI",
        Item: {
            article_id: articleId,
            team_name: teamName,
            timestamp: timestamp,
            published_at: publishDate,
            text_content: articleText
        }
    };
    //Store data in DynamoDB and handle errors
    return new Promise(function (resolve, reject) {
        documentClient.put(params, function (err, data) {
            if (err) {
                reject("Unable to add item: " + JSON.stringify(err));
            }
            else {
                resolve("Item added to table with id: " + articleId);
            }
        });
    });
}
exports.saveArticle = saveArticle;