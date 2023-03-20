let AWS = require("aws-sdk");

//Create a DynamoDB instance 
let documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    //Receive ID from event
    let connectId = event.requestContext.connectionId;
    console.log("Client connected with ID: " + connectId);

    //DynamoDB parameters
    let params = {
        TableName: "WebSocketClients", //table name 
        Item: {
            ConnectionId: connectId
        }
    };

    //Connection Id for communication with client
    try {
        await documentClient.put(params).promise();
        console.log("Connection ID stored.");

        //Return response
        return {
            statusCode: 200,
            body: "Client connected with ID: " + connectId
        };
    }
    catch (err) {
        return {
            statusCode: 500,
            body: "Server Error: " + JSON.stringify(err)
        };
    }
};
