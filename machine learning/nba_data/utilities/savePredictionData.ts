import * as AWS from "aws-sdk"

//AWS Configuration
AWS.config.update({
    region: "us-east-1"
});

//Create instance of AWS SDK
let documentClient = new AWS.DynamoDB.DocumentClient();

/* Function returns a Promise that will save the text with the specified id. */
export function savePredictionData(team_name: string, timestamp: string, mean: number, upper: number, lower: number): Promise<string> {


    //DynamoDB parameters
    let params = {
        TableName: "scorePrediction",
        Item: {
            team_name: team_name,
            timestamp: timestamp,
            mean: mean, 
            upper: upper, 
            lower: lower       
        }
    };

    //Store data in DynamoDB and handle errors
    return new Promise<string>((resolve, reject) => {
        documentClient.put(params, (err, data) => {
            if (err) {
                reject("Unable to add item: " + JSON.stringify(err));
            } else {
                resolve("Item added with id " + params.Item);
            }
        })
    });
}