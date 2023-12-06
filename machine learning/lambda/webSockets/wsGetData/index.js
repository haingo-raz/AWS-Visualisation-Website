let ws = require('websocket'); //websocket

/*Contains main handler */

//Hard coded domain name and stage for data broadcasting to connected clients
let domainName = "wss://13kc76hcsa.execute-api.us-east-1.amazonaws.com";
let stage = "prod";

//CUSTOM CHANGE
exports.handler = async (event) => {

    try{
        //Receive team name from client
        let teamName = JSON.parse(event.body).team_name;

        //log received data
        console.log("Received team_name " + teamName);

        //Allocate domain name and stage dynamically
        domainName = event.requestContext.domainName;
        stage = event.requestContext.stage;
        console.log("Domain: " + domainName + " stage: " + stage);

        //send team name, domain url and stage name
        let sendMsgPromises = await ws.getSendMessagePromises(teamName, domainName, stage);

        await Promise.all(sendMsgPromises);
    }
    catch(error){
        return { statusCode: 500, body: "Error: " + JSON.stringify(error) };
    }

    return { statusCode: 200, body: "Data sent successfully." };
};

