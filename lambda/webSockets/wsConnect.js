let AWS = require("aws-sdk");

/*Called when client connects.
Extracts connection ID from event object.
Stores connection ID in DynamoDB table.
Returns status 200 if successful.*/

//Create a DynamoDB instance to store new connection in database
let documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    //Get connection ID from event 
    let connectId = event.requestContext.connectionId;
    console.log("Client connected with ID: " + connectId);

    //DynamoDB parameters
    let params = {
        TableName: "WebSocketClients", //table name 
        Item: {
            ConnectionId: connectId
        }
    };

    //Store connection Id for communication with client
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
