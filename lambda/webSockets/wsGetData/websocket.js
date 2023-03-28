let AWS = require("aws-sdk");
let db = require('database');//Import functions from database.js

/*Use API Gateway to send message to clients*/

module.exports.getSendMessagePromises = async (message, domainName, stage) => {

    //Get connection IDs of connected clients
    let clientIdArray = (await db.getConnectionIds()).Items;

    //List connected client IDS
    console.log("\nClient IDs:\n" + JSON.stringify(clientIdArray)); 

    //API Gateway Management class
    const apigwManagementApi = new AWS.ApiGatewayManagementApi({
        endpoint: domainName + '/' + stage
    });

    //Object array to hold score data and sentiment data
    let dataArray = [];

    //call getScore() while passing team name
    let scoreObj = await db.getScore(message);

    //call getSentiment() while passing team name
    let sentimentObj = await db.getSentiment(message);

    //push score data inside object array 
    dataArray.push(scoreObj);
    dataArray.push(sentimentObj);

    //Sending messages to clients
    let msgPromiseArray = clientIdArray.map( async item => {
        
        try{
            console.log("Sending message '" + JSON.stringify(dataArray) + "' to: " + item.connectionId);

            //Create parameters for API Gateway
            let apiMsg = {
                ConnectionId: item.connectionId, //change t
                Data: JSON.stringify(dataArray)
            };

            //execution
            await apigwManagementApi.postToConnection(apiMsg).promise();
            //Print results
            console.log("Message '" + JSON.stringify(dataArray)  + "' sent to: " + item.connectionId);
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


