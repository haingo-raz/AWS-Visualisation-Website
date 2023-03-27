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
/*module.exports.getScore = async (teamName) => {

    let params = {
        TableName: "NBA", //dynamoDB table that holds each NBA team score
        KeyConditionExpression: "team_name = :t",
        ExpressionAttributeValues: {
            ":t": teamName
        }
    };

    //query: identifies attributes to retrieve from the table
    return documentClient.query(params).promise();   
};*/



//Return nba score prediciton data for client
/*module.exports.getPredictions = async (teamName) => {

    //DynamoDB parameters
    let params = {
        TableName: "scorePrediction", //dynamoDB table that holds score preditions
        KeyConditionExpression: "team_name = :t",
        ExpressionAttributeValues: {
            ":t": teamName
        }
    };

    return documentClient.query(params).promise(); //query: identifies attributes to retrieve from the table
}*/
