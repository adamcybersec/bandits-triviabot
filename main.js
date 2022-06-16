const SerpApi = require('google-search-results-nodejs'); // npm package for serpApi
const Fuse = require('fuse.js') // npm package for fuzzy matching
const axios = require('axios').default;

const BaseUrl = 'https://someurl-fixme';
const Key = 'ADD A KEY';

// setup serpApi
const search = new SerpApi.GoogleSearch("758608a4a6bd7636298374e041b3e977c1be4c79501654f00cb929834865cc4b");

// QUERY Google using SerpApi
fetchSearchResults = (questionModel) => {
  const params = {
    q: questionModel.q,
    hl: "en",
    gl: "us"
  };
  
  const callback = function(data) {
    //Todo
    //carve out the answers, fuzzy match each potential answer against the results
    //identify the highest fuzzy match score, use that answer to send back to Tom
    fuzzyMatch(questionModel,data)
  };
  
  // Show result as JSON
  search.json(params, callback);
}

fuzzyMatch = (questionModel,searchResults) => {
  const options = {
    includeScore: true,
    // Search in `author` and in `tags` array
    keys: ['query']
  }

  const fuse = new Fuse(searchResults.related_searches, options)

  //ToDo fuzzy each of the potential answers
  const result = fuse.search(questionModel.q);
  
  //console.log(q)
  //console.log(searchResults)
  //console.log(fuse)
  console.log(result)
}

async function main() {
  var questionModel = await GetCurrentQuestion();

  fetchSearchResults(questionModel); 
}


(async () => {
  console.log('starting...');
  await main();
})();






async function GetCurrentQuestion() {
  try {
    //const response = await axios.get(`${BaseUrl}/currentQuestion`);
    //console.log(response);
    //return response.data;

    return {
      q: 'A thousand paper what?',
      a: 'Cranes',
      b: 'Flowers', 
      c: 'Monkeys',
      d: 'Cuts',
      expiry: 2000
    }

  } catch (error) {
    console.error(error);
  }
}

async function GetPrevQuestion(num) {
  try {
    const response = await axios.get(`${BaseUrl}/question?q=${num}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function PostAnswer(questionNumber, answer) {
  try {
    const response = await axios.post(`${BaseUrl}/question?q=${num}`, answer);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
