let AWS = require("aws-sdk");

/*Called when client disconnects*/

//Create dynamoDB instance 
let documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {

    //Get connectionID 
    let connId = event.requestContext.connectionId;
    
    console.log("Disconnection client with ID: " + connId);

    //DynamoDB parameters
    let params = {
        TableName: "WebSocketClients", //table name 
        Item: {
            connectionId: connId
        }
    };

    //Delete connection ID
    try {
        await documentClient.delete(params).promise();
        console.log("Connection ID deleted.");

        return {
            statusCode: 200,
            body: "Client disconnected. ID: " + connId
        };
    }
    catch (err) {
        console.log("Error disconnecting client with ID: " + connId + ": " + JSON.stringify(err));
        return {
            statusCode: 500,
            body: "Server Error: " + JSON.stringify(err)
        };
    }
};

