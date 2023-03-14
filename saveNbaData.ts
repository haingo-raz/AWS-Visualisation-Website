import * as AWS from "aws-sdk"

//AWS Configuration
AWS.config.update({
    region: "us-east-1"
});

//Create instance of AWS SDK
let documentClient = new AWS.DynamoDB.DocumentClient();

/* Function returns a Promise that will save the text with the specified id. */
export function saveNbaData(teamId: number, teamName: string, score: number, season: number, timestamp: number): Promise<string> {

    //DynamoDB parameters
    let params = {
        TableName: "NBA",
        Item: {
            team_id: teamId,
            team_name: teamName,
            score: score,
            season: season,
            timestamp: timestamp
        }
    };

    //Store data in DynamoDB and handle errors
    return new Promise<string>((resolve, reject) => {
        documentClient.put(params, (err, data) => {
            if (err) {
                reject("Unable to add item: " + JSON.stringify(err));
            } else {
                resolve("Item sent to cloud");
            }
        })
    });
}
