//Gets the prediction 
let AWS = require("aws-sdk"); //Import AWS

//Set region
AWS.config.update({region:'us-east-1'});

//Data that we are going to send to endpoint
let endpointData = {
    "instances":
        [
            {
                "start":"12-09-2020",
                "target": [119, 106, 104, 124, 108, 117, 114, 102, 106, 126, 109, 138, 127, 107, 96, 108, 114, 114, 92, 101, 107, 102, 113, 109, 98, 113, 120, 115, 89, 121, 104, 117, 106, 94, 105, 112, 120, 109, 117, 124, 115, 135, 119, 112, 103, 117, 90, 109, 109, 92, 128, 85, 100, 124, 128, 94, 127, 113, 94, 114, 110, 100, 101, 107, 93, 93, 137, 97, 96, 110, 101, 106, 115, 126, 101, 101, 105, 114, 123, 116, 104, 94, 111, 110, 97, 122, 86, 96, 94, 82, 78, 90, 126, 84, 108, 116, 95, 115, 95, 115, 96, 120, 86, 137, 110, 115, 119, 92, 108, 125, 103, 108, 121, 113, 83, 103, 119, 104, 116, 121, 102, 95, 118, 111, 114, 117, 100, 110, 104, 116, 107, 121, 86, 117, 124, 99, 111, 66, 110, 132, 99, 72, 119, 121, 110, 106, 110, 110, 122, 130, 128, 122, 139, 90, 106, 116, 107, 114, 87, 105, 104, 122, 131, 120, 115, 111, 104, 109, 110, 146, 105, 114, 112, 73, 84, 84, 106, 134]
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
const endpointName = "LakersEndpoint1";

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

