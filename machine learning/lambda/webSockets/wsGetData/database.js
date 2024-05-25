let AWS = require("aws-sdk");

/*handle connection IDs*/

//Create new DocumentClient
let documentClient = new AWS.DynamoDB.DocumentClient();

//Returns all of the connection IDs
module.exports.getConnectionIds = async () => {
    let params = {
        TableName: "WebSocketClients"
    };
    return documentClient.scan(params).promise();
};

//Deletes specified connection ID
module.exports.deleteConnectionId = async (connectionId) => {
    console.log("Deleting connection Id: " + connectionId);

    let params = {
        TableName: "WebSocketClients",
        Key: {
            ConnectionId: connectionId
        }
    };
    return documentClient.delete(params).promise();
};


//Return News API sentiment analysis data of specified team for client
module.exports.getSentiment = async (teamName) => {

    //DynamoDB table parameters
    let params = {
        TableName: "articleAnalysis", //dynamoDB table that holds text sentiment analysis results
        FilterExpression: "team_name = :t",
        ExpressionAttributeValues: {
            ":t": teamName
        }
    };

    //returns all data items 
    return documentClient.scan(params).promise(); 
};



//Numerical data
//Get each team historical data
module.exports.getScore = async(teamName) => {

    //find all the items where the value of team_name is equal to the provided team_name
    let params = {
        TableName: "NBA", //dynamoDB table that holds each NBA team score
        FilterExpression: "team_name = :t",
        ExpressionAttributeValues: {
            ":t": teamName
        },
    };

    //log params
    console.log("DynamoDB Params: " + JSON.stringify(params)); //received

    //return table items
    return documentClient.scan(params).promise();
};