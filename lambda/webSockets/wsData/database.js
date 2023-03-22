let AWS = require("aws-sdk");

//handle connection IDs

//Create new DocumentClient
let documentClient = new AWS.DynamoDB.DocumentClient();

//Returns all of the connection IDs
module.exports.getConnectionIds = async () => {
    let params = {
        TableName: "WebSocketClients"
    };
    return documentClient.scan(params).promise();
};

//Deletes the specified connection ID
module.exports.deleteConnectionId = async (connectionId) => {
    console.log("Deleting connection Id: " + connectionId);

    let params = {
        TableName: "WebSocketClients",
        Key: {
            connectionId: connectionId
        }
    };
    return documentClient.delete(params).promise();
};

//Return nba score prediciton data for client
module.exports.getPredictions = async (teamName) => {

    //DynamoDB parameters
    let params = {
        TableName: "scorePrediction", //dynamoDB table that holds score preditions
        KeyConditionExpression: "team_name = :t",
        ExpressionAttributeValues: {
            ":t": teamName
        }
    };

    //console.log("Params: " + JSON.stringify(params));
    return documentClient.query(params).promise(); //query: identifies attributes to retrieve from the table
}


//Return News API sentiment analysis data of specified team for client
module.exports.getSentiment() = async (teamName) => {

    let params = {
        TableName: "sentimentData", //dynamoDB table that holds text sentiment analysis results
        FilterExpression: "team_name = :t",
        ExpressionAttributeValues: {
            ":t": teamName
        }
    };

    //console.log("Params: " + JSON.stringify(params));
    return documentClient.scan(params).promise(); //returns all data items 
};


//Get each team historical data
module.exports.getScore = async (teamName) => {

    let params = {
        TableName: "NBA", //dynamoDB table that holds each NBA team score
        KeyConditionExpression: "team_name = :t",
        ExpressionAttributeValues: {
            ":t": teamName
        }
    };

    //console.log("Params: " + JSON.stringify(params));
    return documentClient.query(params).promise(); //query: identifies attributes to retrieve from the table
};

