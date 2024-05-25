//Gets the prediction 
let AWS = require("aws-sdk"); //Import AWS

//Set region
AWS.config.update({region:'us-east-1'});

//Data that we are going to send to endpoint
let endpointData = {
    "instances":
        [
            {
                "start":"08-01-2020",
                "target": [114, 116, 123, 112, 112, 105, 98, 113, 103, 123, 109, 108, 109, 119, 93, 108, 104, 116, 135, 109, 109, 119, 128, 106, 149, 112, 122, 122, 122, 128, 102, 109, 90, 110, 103, 93, 111, 122, 102, 92, 109, 112, 101, 114, 113, 117, 121, 95, 122, 107, 95, 110, 111, 116, 116, 108, 114, 126, 102, 75, 91, 112, 117, 126, 109, 107, 119, 124, 141, 93, 120, 111, 107, 106, 119, 111, 118, 118, 91, 99, 112, 93, 108, 125, 126, 109, 115, 109, 92, 121, 108, 119, 109, 116, 99, 110, 134, 124, 124, 116, 122, 109, 104, 104, 111, 101, 132, 96, 118, 105, 143, 96, 96, 119, 121, 145, 126, 94, 120, 119, 122, 115, 132, 112, 121, 98, 134, 107, 92, 104, 95, 122, 130, 108, 104, 107, 111, 111, 83, 89, 88, 112, 101, 122, 92, 113, 109, 88, 107, 140, 132, 145, 99, 126, 98, 114, 98, 102, 104, 107, 99, 99, 111, 114, 114, 103, 116, 116, 110, 144, 112, 130, 90, 103, 117, 119, 104, 105, 102, 107, 92, 124, 111, 123, 102, 114, 126, 128, 113, 82, 128, 108, 116, 107, 129, 120, 125, 135, 113, 115, 126, 134, 117, 121, 97, 105, 105, 114, 115, 139, 109, 116, 89, 109, 101, 103, 93, 107, 109, 107, 102, 127, 108, 116, 103]
            }
        ],
    "configuration":
        {
            "num_samples": 50,
            "output_types":["mean","quantiles","samples"],
            "quantiles":["0.1","0.9"]
        }
};

//Name of endpoint
const endpointName = "CelticsEndpoint1";

//Parameters for calling endpoint
let params = {
    EndpointName: endpointName,
    Body: JSON.stringify(endpointData),
    ContentType: "application/json",
    Accept: "application/json"
};

//AWS class that will query endpoint
let awsRuntime = new AWS.SageMakerRuntime({});

//Handler for Lambda function
exports.handler = event => {
    //Call endpoint and handle response
    awsRuntime.invokeEndpoint(params, (err, data)=>{
        if (err) {//An error occurred
            console.log(err, err.stack);

            //Return error response
            const response = {
                statusCode: 500,
                body: JSON.stringify('ERROR: ' + JSON.stringify(err)),
            };
            return response;
        }
        else{//Successful response
            //Convert response data to JSON
            let responseData = JSON.parse(Buffer.from(data.Body).toString('utf8'));
            console.log(JSON.stringify(responseData));

            //TODO: STORE DATA IN PREDICTION TABLE

            //Return successful response
            const response = {
                statusCode: 200,
                body: JSON.stringify('Predictions stored.'),
            };
            return response;
        }
    });
};

//Comment this out if running on AWS Lambda
exports.handler();