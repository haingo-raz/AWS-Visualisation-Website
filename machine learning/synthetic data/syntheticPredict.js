//Visualisation of predictions data 
const axios = require('axios'); //Axios to download data

const predictions = require('./secondPrediction.json');  //this

//Student ID
let studentID = 'M00752552';

//URL where student data is available
let url = 'https://bmmkl4lj0d.execute-api.us-east-1.amazonaws.com/prod/';

//Authentication details for Plotly
const PLOTLY_USERNAME = 'haingoraz';
const PLOTLY_KEY = 'Dnn34iOGI7ItFDnSruJF';

//Initialize Plotly with user details.
let plotly = require('plotly')(PLOTLY_USERNAME, PLOTLY_KEY);

exports.handler = async (event) => {
    try {

        //Get synthetic data target value
        let yValues = (await axios.get(url + studentID)).data.target;

        //Add basic X values for plot: the number of target values is the number on the x axis
        let xValues = [];
        for (let i = 0; i < yValues.length; ++i) {
            xValues.push(i);
        }

        //Call function to plot data
        let plotResult = await plotData(studentID, xValues, yValues);
        console.log("Plot for student '" + studentID + "' available at: " + plotResult.url);

        return {
            statusCode: 200,
            body: "Ok"
        };
    }
    catch (err) {
        console.log("ERROR: " + err);
        return {
            statusCode: 500,
            body: "Error plotting data for student ID: " + studentID
        };
    }
};

//Plots the specified data
async function plotData(studentID, xValues, yValues) {

    //Data
    let synthData = {
        x: xValues,
        y: yValues,
        type: "scatter",
        mode: 'line',
        name: 'Original data',
        marker: {
            color: 'rgb(219, 64, 82)',
            size: 12
        }
    };

    //PREDICTION
    //Get x axis of the prediction line
    let predictionX = [];
    for (let i = yValues.length; i < yValues.length + predictions.predictions[0].mean.length; ++i) {
        predictionX.push(i);
    }

    //Prediction graph with a different color
    let meanData = {
        x: predictionX,
        y: predictions.predictions[0].mean,
        type: "scatter",
        mode: "line",
        name: "Mean",
        marker: {
            color: 'rgb(30, 144, 255)',
            size: 12
        }
    }

    let lowerQuantile = {
        x: predictionX,
        y: predictions.predictions[0].quantiles["0.1"],
        type: "scatter",
        mode: "line",
        name: "0.1%",
        marker: {
            color: 'rgb(255, 255, 0)',
            size: 12
        }
    }

    let upperQuantile = {
        x: predictionX,
        y: predictions.predictions[0].quantiles["0.9"],
        type: "scatter",
        mode: "line",
        name: "0.9%",
        marker: {
            color: 'rgb(0, 128, 0)',
            size: 12
        }
    }

    let data = [synthData, meanData, lowerQuantile, upperQuantile];

    //Graph layout
    let layout = {
        title: "Prediction synthetic data (" + studentID + ")",
        font: {
            size: 25
        },
        xaxis: {
            title: 'Time (hours)'
        },
        yaxis: {
            title: 'Value'
        }
    };

    let graphOptions = {
        layout: layout,
        filename: "synthetic_prediction",
        fileopt: "overwrite"
    };

    return new Promise((resolve, reject) => {
        plotly.plot(data, graphOptions, function (err, msg) {
            if (err)
                reject(err);
            else {
                resolve(msg);
            }
        });
    });
};

//Locally run
exports.handler({});