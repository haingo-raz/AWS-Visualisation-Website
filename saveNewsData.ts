import * as AWS from "aws-sdk"

//AWS Configuration
AWS.config.update({
    region: "us-east-1"
});

//Create instance of AWS SDK
let documentClient = new AWS.DynamoDB.DocumentClient();

/* Function returns a Promise that will save the text with the specified id. */
export function saveArticle(articleId: number, teamName: string, publishDate: string, articleText: string): Promise<string> {

    //DynamoDB parameters
    let params = {
        TableName: "NewsAPI",
        Item: {
            article_id: articleId,
            team_name: teamName,
            published_at: publishDate, // created_at of tweet
            text: articleText,//Text of tweet
        }
    };

    //Store data in DynamoDB and handle errors
    return new Promise<string>((resolve, reject) => {
        documentClient.put(params, (err, data) => {
            if (err) {
                reject("Unable to add item: " + JSON.stringify(err));
            } else {
                resolve("Item added to table with id: " + articleId);
            }
        })
    });
}
