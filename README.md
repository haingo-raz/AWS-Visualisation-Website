# NBA Sentiment Analysis and Prediction

![NBA Logo](https://i.imgur.com/9QnhVRc.png)

## Overview

This project visualizes historical data, sentiment analysis, and prediction data for five NBA teams: Lakers, Celtics, Warriors, Rockets, and Bulls. The data is stored in AWS DynamoDB, and sentiment analysis and prediction models are built and deployed using Amazon SageMaker, Amazon Comprehend, and AWS Lambda. The front-end of the application is built using ReactJS.

## Features

- Historical data visualization
- Sentiment analysis for each team's tweets
- Real-time prediction of each team's future score

## Data Collection

We collected data for the five NBA teams from Twitter using the News API and the Balldontlie API.

## Sentiment Analysis

We use Amazon Comprehend to perform sentiment analysis on each team's tweets. The results are displayed on a pie chart, with each slice representing the percentage of positive, negative, and neutral tweets.

![Sentiment Analysis](https://i.imgur.com/hwZHeIm.png)

## Prediction Model

We use Amazon SageMaker to train a logistic regression model on historical data for each team. The model predicts the probability of each team winning their next game. The results are displayed on a bar chart, with each bar representing the probability of each team winning.

![Prediction Model](https://i.imgur.com/dFtNoz7.png)

## Technologies Used

- ReactJS
- TypeScript
- Python
- AWS DynamoDB
- Amazon SageMaker
- Amazon Comprehend
- AWS S3
- AWS Lambda

## Getting Started

To run the project locally, clone the repository and install the dependencies using `npm install`. Then, run the project using `npm start`.

## Conclusion

This project demonstrates how AWS services can be used to collect, store, and analyze data in real-time. The sentiment analysis and prediction models provide valuable insights into each team's performance, and the visualizations make the data easy to understand and interpret.

## Credits

- NBA logo from [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:NBA_logo.svg)
