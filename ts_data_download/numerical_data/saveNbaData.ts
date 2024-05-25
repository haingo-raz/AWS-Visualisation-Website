import * as AWS from "aws-sdk"

//AWS Configuration
AWS.config.update({
    region: "us-east-1"
});

//Create instance of AWS SDK
let documentClient = new AWS.DynamoDB.DocumentClient();

/* Function returns a Promise that will save the text with the specified id. */
export function saveNbaData(teamId: number, matchDate: string, teamName: string, timestamp: number, score: number, season: number): Promise<string> {

    //DynamoDB parameters
    let params = {
        TableName: "NBA",
        Item: {
            team_id: teamId,
            match_date: matchDate,
            team_name: teamName,
            timestamp: timestamp,
            score: score,
            season: season
            
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