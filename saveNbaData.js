"use strict";
exports.__esModule = true;
exports.saveNbaData = void 0;
var AWS = require("aws-sdk");
//AWS Configuration
AWS.config.update({
    region: "us-east-1"
});
//Create instance of AWS SDK
var documentClient = new AWS.DynamoDB.DocumentClient();
/* Function returns a Promise that will save the text with the specified id. */
function saveNbaData(teamId, matchDate, teamName, timestamp, score, season) {
    //DynamoDB parameters
    var params = {
        TableName: "NBA",
        Item: {
            team_id: teamId,
            match_date: matchDate,
            team_name: teamName,
            timestamp: timestamp,
            score: score,
            season: season
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
exports.saveNbaData = saveNbaData;
