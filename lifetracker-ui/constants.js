let PRODUCTION_API_BASE_URL = "https://lifetracker-jmf.herokuapp.com"; //whatever url the production API is deployed at
let DEVELOPMENT_API_BASE_URL = "http://localhost:3001";
let API_BASE_URL = DEVELOPMENT_API_BASE_URL;

export default API_BASE_URL;
//API_BASE_URL - if process.env.NODE_ENV is production, set this to PRODUCTION_API_BASE_URL, otherwise set it to DEVELOPMENT_API_BASE_URL