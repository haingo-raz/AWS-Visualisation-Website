"use strict";
exports.__esModule = true;
exports.savePredictionData = void 0;
var AWS = require("aws-sdk");
//AWS Configuration
AWS.config.update({
    region: "us-east-1"
});
//Create instance of AWS SDK
var documentClient = new AWS.DynamoDB.DocumentClient();
/* Function returns a Promise that will save the text with the specified id. */
function savePredictionData(team_name, timestamp, mean, upper, lower) {
    //DynamoDB parameters
    var params = {
        TableName: "scorePrediction",
        Item: {
            team_name: team_name,
            timestamp: timestamp,
            mean: mean,
            upper: upper,
            lower: lower
        }
    };
    //Store data in DynamoDB and handle errors
    return new Promise(function (resolve, reject) {
        documentClient.put(params, function (err, data) {
            if (err) {
                reject("Unable to add item: " + JSON.stringify(err));
            }
            else {
                resolve("Item added with id " + params.Item);
            }
        });
    });
}
exports.savePredictionData = savePredictionData;