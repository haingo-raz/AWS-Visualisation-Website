import * as AWS from "aws-sdk"

//AWS Configuration
AWS.config.update({
    region: "us-east-1"
});

//Create instance of AWS SDK
let documentClient = new AWS.DynamoDB.DocumentClient();

/* Function returns a Promise that will save the text with the specified id. */
export function saveArticle(articleId: number, teamName: string, timestamp: number, publishDate: string, articleText: string): Promise<string> {

    //DynamoDB parameters
    let params = {
        TableName: "NewsAPI",
        Item: {
            article_id: articleId,
            team_name: teamName,
            timestamp: timestamp,
            published_at: publishDate, // article publish date
            text_content: articleText,//Text of article
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