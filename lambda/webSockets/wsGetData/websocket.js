let AWS = require("aws-sdk");
let db = require('database');//Import functions from database.js

/*Use API Gateway to send message to clients*/

module.exports.getSendMessagePromises = async (message, domainName, stage) => {

    //Get connection IDs of clients FROM WebSocketClients
    let clientIdArray = (await db.getConnectionIds()).Items;
    console.log("\nClient IDs:\n" + JSON.stringify(clientIdArray));

    //Create API Gateway management class.
    const apigwManagementApi = new AWS.ApiGatewayManagementApi({
        endpoint: domainName + '/' + stage
    });

    //Try to send message to connected clients
    let msgPromiseArray = clientIdArray.map( async item => {
        try{
            console.log("Sending message '" + message + "' to: " + item.connectionId);

            //Create parameters for API Gateway
            let apiMsg = {
                ConnectionId: item.connectionId,
                Data: JSON.stringify(message)
            };

            //Wait for API Gateway to execute and log result
            await apigwManagementApi.postToConnection(apiMsg).promise();
            console.log("Message '" + message + "' sent to: " + item.connectionId);
        }
        catch(err){
            console.log("Failed to send message to: " + item.connectionId);

            //Delete connection ID from database
            if(err.statusCode == 410) {
                try {
                    await db.deleteConnectionId(item.connectionId);
                }
                catch (err) {
                    console.log("ERROR deleting connectionId: " + JSON.stringify(err));
                    throw err;
                }
            }
            else{
                console.log("UNKNOWN ERROR: " + JSON.stringify(err));
                throw err;
            }
        }
    });

    return msgPromiseArray;
};


