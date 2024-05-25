//Gets the prediction 
let AWS = require("aws-sdk"); //Import AWS

//Set region
AWS.config.update({region:'us-east-1'});

//Data that we are going to send to endpoint
let endpointData = {
    "instances":
        [
            {
                "start":"04-11-2019",
                "target": [127, 108, 100, 94, 100, 106, 105, 119, 105, 79, 79, 86, 110, 87, 112, 107, 110, 110, 100, 109, 96, 102, 106, 91, 125, 106, 104, 121, 112, 116, 102, 118, 113, 84, 100, 124, 131, 104, 98, 131, 118, 104, 120, 109, 96, 104, 88, 101, 108, 94, 101, 115, 94, 116, 113, 134, 92, 97, 114, 122, 113, 98, 97, 105, 99, 99, 129, 116, 129, 108, 114, 118, 117, 115, 93, 115, 132, 137, 107, 130, 111, 98, 130, 137, 91, 106, 120, 106, 101, 100, 98, 120, 147, 121, 114, 123, 100, 95, 112, 104, 108, 97, 131, 122, 117, 118, 116, 103, 122, 104, 119, 136, 116, 107, 116, 147, 114, 125, 107, 77, 108, 114, 123, 119, 103, 98, 118, 113, 103, 109, 125, 111, 113, 114, 119, 104, 111, 100, 121, 115, 126, 120, 123, 118, 104, 126, 102, 111, 107, 127, 102, 138, 103, 119, 101, 119, 116, 105, 108, 99, 102, 96, 93, 113, 108, 113, 116, 106, 114, 119, 126, 105, 104, 117, 105, 118, 101, 116, 122, 123, 82, 122, 105, 124, 88, 118, 110, 115, 109, 126, 115, 130, 100, 113, 117, 110, 104, 110, 114, 95, 99, 124, 124, 132, 111, 86, 96, 117, 116, 85, 114, 113, 121, 103, 90, 128, 94, 96, 128, 123, 112, 118, 100, 126, 102, 121, 117, 101, 142, 109, 108, 95, 112, 110, 101, 126, 120, 109]
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
const endpointName = "WarriorsEndpoint1";

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