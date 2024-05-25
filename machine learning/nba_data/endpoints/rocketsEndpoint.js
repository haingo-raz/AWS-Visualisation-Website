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
                "target": [122, 126, 99, 112, 130, 92, 112, 128, 91, 116, 139, 110, 107, 115, 121, 131, 110, 125, 121, 113, 109, 120, 117, 118, 107, 135, 153, 120, 102, 113, 105, 123, 129, 96, 104, 111, 107, 114, 114, 100, 104, 112, 109, 102, 100, 96, 126, 111, 113, 87, 103, 99, 90, 104, 136, 102, 94, 100, 124, 132, 103, 115, 101, 119, 111, 114, 100, 106, 120, 102, 91, 84, 96, 100, 109, 122, 94, 107, 112, 105, 133, 122, 104, 101, 108, 107, 91, 89, 110, 114, 107, 120, 130, 100, 109, 97, 117, 99, 115, 129, 102, 99, 97, 116, 95, 87, 143, 115, 129, 109, 116, 126, 122, 102, 107, 107, 133, 94, 111, 76, 97, 104, 107, 125, 90, 118, 106, 103, 85, 146, 89, 89, 118, 114, 102, 124, 106, 117, 114, 106, 91, 114, 92, 102, 118, 110, 101, 115, 111, 94, 99, 89, 116, 118, 106, 99, 110, 113, 118, 123, 104, 111, 105, 132, 123, 114, 108, 103, 106, 115, 116, 120, 139, 111, 128, 107, 97, 100, 115, 125, 91, 123, 121, 100, 118, 91, 118, 120, 117, 115, 76, 111, 98, 101, 106, 112, 98, 132, 127, 106, 84, 105, 95, 114, 106, 114]
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
const endpointName = "RocketsEndpoint1";

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