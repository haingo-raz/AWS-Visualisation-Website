//Gets the prediction 
let AWS = require("aws-sdk"); //Import AWS

//Set region
AWS.config.update({region:'us-east-1'});

//Data that we are going to send to endpoint
let endpointData = {
    "instances":
        [
            {
                "start":"2023-02-28 09:00:00",
                "target": [208.8751470738227, 226.79178909476113, 216.66993368994716, 219.43744019319467, 209.92538245675442, 229.81812818395574, 233.63757661106408, 239.7200495535684, 242.30067190554556, 248.0918044300195, 242.29740374805846, 243.87010482769972, 250.33383411327878, 259.50223477179526, 247.59713590276206, 248.9059542751151, 240.43164335423955, 244.98183669805155, 250.85385297949324, 232.3982325693206, 242.23398646184765, 243.40777175405162, 233.42208571671796, 234.34150221857314, 234.17533722112046, 235.61998067811388, 226.0566543419117, 218.31145431355887, 219.7462300599389, 240.338587339585, 225.2903640679055, 248.73151795850094, 253.2659341066837, 256.6485735069969, 248.28677144240044, 260.9124927149476, 251.26768179570973, 271.0734596982313, 270.6488702033927, 266.13588859149235, 270.1637877760763, 257.79552346904035, 257.225152172067, 254.69107940377717, 246.127454797284, 245.49284366448202, 231.47945957631015, 242.56589503996986, 246.91447801667783, 247.22712573402097, 232.30560758990498, 235.49085802480144, 245.88621245641772, 232.75824849374004, 247.1535728665053, 254.82941577450742, 248.4272753475685, 255.39768341555225, 268.6695874772745, 268.9821245755156, 267.108387253392, 281.3860150901807, 272.01407901907936, 265.3640698718537, 257.56232019055017, 260.21949286066257, 265.4079588044208, 262.43838465379457, 267.8139665031351, 260.6867624235382, 258.3168948279671, 258.3405863855812, 239.5614885533263, 250.05834267354481, 234.8370847410376, 250.74152463942244, 256.3525094156008, 252.23334628463263, 261.4279996939347, 262.0545614046289, 274.27917530209027, 279.43170936240233, 263.3662633861983, 285.9033634788445, 283.59911730728254, 285.1191518203978, 280.2655819187243, 288.12086525014354, 289.69179022113946, 275.2785276324737, 263.254074642453, 268.05653395273805, 273.05409781036786, 261.4609931419509, 272.54101832223915, 259.25934679019963, 265.3272094013384, 247.1051919797535, 256.2137049674296, 248.013501444476]
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
//REPLACE THIS WITH THE NAME OF YOUR ENDPOINT
const endpointName = "endpointModel2";

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