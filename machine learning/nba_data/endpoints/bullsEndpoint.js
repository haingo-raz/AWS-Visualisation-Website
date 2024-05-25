//Gets the prediction 
let AWS = require("aws-sdk"); //Import AWS

//Set region
AWS.config.update({region:'us-east-1'});

//Data that we are going to send to endpoint
let endpointData = {
    "instances":
        [
            {
                "start":"2021-03-03",
                "target": [128, 105, 121, 105, 99, 127, 97, 101, 94, 90, 106, 110, 114, 94, 117, 94, 118, 102, 118, 106, 91, 116, 105, 108, 98, 108, 100, 115, 95, 108, 115, 104, 123, 102, 106, 113, 107, 123, 120, 120, 59, 111, 94, 107, 109, 119, 92, 105, 100, 123, 133, 96, 95, 118, 113, 103, 97, 117, 114, 133, 113, 131, 102, 128, 120, 122, 104, 109, 121, 112, 126, 106, 112, 128, 115, 133, 120, 98, 93, 117, 122, 108, 124, 107, 77, 104, 111, 106, 114, 92, 108, 99, 110, 98, 112, 111, 130, 110, 98, 107, 103, 111, 124, 121, 134, 99, 101, 130, 90, 112, 106, 102, 135, 125, 113, 109, 94, 91, 99, 109, 106, 77, 92, 130, 120, 124, 117, 114, 86, 81, 100, 95, 131]
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
const endpointName = "BullsEndpoint1";

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