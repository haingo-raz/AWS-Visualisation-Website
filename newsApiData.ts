//Module that reads keys from .env file
const dotenv = require('dotenv');
import axios, { AxiosResponse } from "axios";
import { saveArticle } from "./saveNewsData";

//Copy variables in file into environment variables
dotenv.config();

//Inteface for article properties
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

// Define the search query parameters
/*const searchQuery: string = "Los Angeles Lakers";
const searchLanguage: string = "en";
const searchPageSize: number = 10;*/


//Download and store news api data 
async function getNewsData(teamName: string): Promise<any> {

    const NewsAPIUrl = `${baseUrl}/everything?q=${teamName}&language=en&sortBy=publishedAt&apiKey=${apiKey}`;

    let id = 0
  
    try {

      const dataResponse = await axios.get(NewsAPIUrl);
      
      const articles = dataResponse.data.articles;

      articles.forEach((article) => {
        saveArticle(id++, teamName, article.publishedAt, article.description)
      })   

    } catch (error) {
      console.error(error);
    }
}

//Send articles about Los Angeles Lakers only to AWS DynamoDB 
getNewsData('Los Angeles Lakers').then((data) => console.log(data));