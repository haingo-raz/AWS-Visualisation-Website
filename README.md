# NBA Sentiment Analysis and Prediction

## Overview

This project displays visualizations of historical data, predictions, and sentiment analysis data for five NBA teams: Lakers, Celtics, Warriors, Rockets, and Bulls. The historical data has been collected using the NEWS API (articles) and the balldontlie API (past NBA scores). AWS has been used for making predictions (SageMaker) and performing sentiment analysis (Comprehend). The score predictions were made using the historical scores, while the sentiment analysis was made based on the tone of the articles about each team.

## Features

- Visualization of historical data.
- Sentiment analysis for each team's related news articles.
- Real-time prediction of each team's future scores.

## Data Collection
Score data of the five NBA teams was collected using the Balldontlie API (score) and the News API (articles).

## Sentiment Analysis
Amazon Comprehend was used to perform sentiment analysis on the news articles related to each team. The results are displayed on a pie chart, with each slice representing the ratio of positive, negative, and neutral news articles.

## Prediction Model
Amazon SageMaker was used to train a logistic regression model on historical data for each team. The model predicts the scores of each team in upcoming matches. The results are displayed on a line chart.

## Technologies Used

|Tool|Usage|
|----|-----|
|ReactJS|Frontend framework|
|Scss|Style the frontend|
|Recharts|Chart library for line charts and pie charts|
|TypeScript|Provides static types and interfaces to ensure type safety|
|Python|Used to create a code that separates JSON files into training and test sets|
|News API|Used with TypeScript to download text data for sentiment analysis|
|balldontlie API|Used to download past NBA scores|
|Amazon DynamoDB|Database service used to store historical score, score predictions, and sentiment analysis data|
|Amazon SageMaker|Used to generate predictions|
|Amazon Comprehend|Used to perform sentiment analysis on the data downloaded from News API|
|Amazon S3|Storage service used to |
|Amazon Lambda|Connect event together for data processing. Triggers sentiment analysis and web sockets update|
|Amazon Cloudwatch|Used to monitor other AWS services|
|API Gateway|Assign a connection ID to website visitors|


## Screenshots
### Homepage
![Homepage](https://raw.githubusercontent.com/haingo-raz/React-AWS-Visualisation-Website/master/website/public/assets/homepage.png)

### Lakers score visualisation against time
![Lakers score](https://raw.githubusercontent.com/haingo-raz/React-AWS-Visualisation-Website/master/website/public/assets/Lakers-score-to-time.png)

### Lakers score prediction against time
![Lakers score prediction](https://raw.githubusercontent.com/haingo-raz/React-AWS-Visualisation-Website/master/website/public/assets/lakers_prediction.jpeg)

### Visualisation board for Houston Rockets
![Houston Rockets Visualisation](https://raw.githubusercontent.com/haingo-raz/React-AWS-Visualisation-Website/master/website/public/assets/full-page-houston-rockets-visualisation.png)

## Credits

|API|Usage|
|---|-----|
|[Balldontlie API](https://www.balldontlie.io/home.html)|Get score data of past NBA matches|
|[News API](https://newsapi.org/)|Get news articles for sentiment analysis purposes|

- NBA logo from [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:NBA_logo.svg)
