# NBA Sentiment Analysis and Prediction

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

## Prediction Model

We use Amazon SageMaker to train a logistic regression model on historical data for each team. The model predicts the probability of each team winning their next game. The results are displayed on a bar chart, with each bar representing the probability of each team winning.

## Technologies Used

- ReactJS
- Recharts
- TypeScript
- Python
- AWS DynamoDB
- Amazon SageMaker
- Amazon Comprehend
- AWS S3
- AWS Lambda

## Screenshots
### Homepage
![Homepage](https://raw.githubusercontent.com/haingo-raz/React-AWS-Visualisation-Website/master/website/public/assets/homepage.png
)

### Lakers score visualisation against time
![Lakers score](https://raw.githubusercontent.com/haingo-raz/React-AWS-Visualisation-Website/master/website/public/assets/Lakers-score-to-time.png
)

### Lakers score prediction against time
![Lakers score prediction](https://raw.githubusercontent.com/haingo-raz/React-AWS-Visualisation-Website/master/website/public/assets/lakers_prediction.jpeg
)

### Visualisation board for Houston Rockets
![Houston Rockets Visualisation](https://raw.githubusercontent.com/haingo-raz/React-AWS-Visualisation-Website/master/website/public/assets/full-page-houston-rockets-visualisation.png
)

## Credits

- NBA logo from [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:NBA_logo.svg)
