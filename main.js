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
    shouldSort: true,
    // Search in `author` and in `tags` array
    keys: ['query']
  }

  //console.log('----- search results=====');
  //console.log(searchResults.related_searches);

  const fuse = new Fuse(searchResults.related_searches.map(x => x.query), options);

  var scores = {};
  minScore =1;
  answer = '';
  var answerKeys = ['a','b','c','d'];
  for (answerKey of answerKeys) {
    console.log('answer: '+answerKey+': '+questionModel[answerKey]);
    const result = fuse.search(questionModel[answerKey]);
    if (result.length > 0) {
      if (result[0].score < minScore) {
        minScore = result[0].score;
        answer = answerKey;
      }
    }
  }
  console.log('ANSWER: '+answer);
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
      b: 'Cranes',
      a: 'Flowers', 
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
