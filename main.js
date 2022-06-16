const SerpApi = require('google-search-results-nodejs'); // npm package for serpApi
const Fuse = require('fuse.js') // npm package for fuzzy matching

// setup serpApi
const search = new SerpApi.GoogleSearch("062dce0330556c852218af3807dd0b61ad6ba2115b9f868bf7b9678434e3d330");

// QUERY Google using SerpApi
fetchSearchResults = (questionString) => {
  const params = {
    q: questionString,
    hl: "en",
    gl: "us"
  };
  
  const callback = function(data) {
    //console.log(data);
    fuzzyMatch(questionString,data)
  };
  
  // Show result as JSON
  search.json(params, callback);
}

fuzzyMatch = (questionString,searchResults) => {
  const options = {
    includeScore: true,
    // Search in `author` and in `tags` array
    keys: ['query']
  }

  const fuse = new Fuse(searchResults.related_searches, options)

  const result = fuse.search(potentialAnswers);
  
  //console.log(questionString)
  //console.log(searchResults)
  //console.log(fuse)
  console.log(result)
}

fetchSearchResults();