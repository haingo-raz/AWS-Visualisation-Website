//Module that reads keys from .env file
const dotenv = require('dotenv');
const axios = require('axios');
const moment = require('moment');
import { saveArticle } from "./saveNewsData";

//Copy variables in file into environment variables
dotenv.config();

//Interface for article properties
interface Article {
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
  }
  
  //interface for desired response
  interface NewsApiResponse {
    status: string;
    totalResults: number;
    articles: Article[];
  }

// Define the API key and the base URL for the News API
const apiKey: any = process.env.NEWS_API_KEY;
const baseUrl: string = "https://newsapi.org/v2";


//Download and store news api data 
async function getNewsData(teamName: string): Promise<any> {

    const NewsAPIUrl = `${baseUrl}/everything?q=${teamName}&language=en&sortBy=publishedAt&apiKey=${apiKey}`;

    let id = 0
  
    try {

      const dataResponse = await axios.get(NewsAPIUrl);
      
      const articles = dataResponse.data.articles;

      //save each response data to dynamoDB table
      articles.forEach((article) => {

        let timestamp: number = +moment(article.publishDate).format("X");
        saveArticle(id++, teamName, timestamp, article.publishedAt, article.description)
      })   

    } catch (error) {
      console.error(error);
    }
}

//Get news api data and push to News api table 
getNewsData('Los Angeles Lakers').then((data) => console.log(data));
getNewsData('Chicago Bulls').then((data) => console.log(data));
getNewsData('Houston Rockets').then((data) => console.log(data));
getNewsData('Golden State Warriors').then((data) => console.log(data));
getNewsData('Boston Celtics').then((data) => console.log(data));


// let teamList: string[] = [
//   'Los Angeles Lakers', 
//   'Chicago Bulls',
//   'Houston Rockets',
//   'Golden State Warriors',
//   'Boston Celtics'
// ]

// function getTextData(){
//   for (let x=0; x< teamList.length; x++){
//     getNewsData(teamList[x]);
//   }
// }

// getTextData();
