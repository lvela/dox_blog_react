import fetch from 'isomorphic-fetch'
import {API_HOST} from '../utils/constants'

export function fetchArticles(args={}) {
  let {searchTerm, currentPage} = args
  let path = "articles.json"

  const params = encodeQueryObject({page: currentPage, q: searchTerm})

  if(params !== "") {
    path = `${path}?${params}`
  }

  return _fetchArticles(path)
}

export function fetchSuggestions(value) {
  return _fetchArticles(`articles/search_suggestions.json?value=${value}`)
}

export function fetchRelevantSuggestions(value) {
  return _fetchArticles(`articles/search_with_relevance.json?value=${value}`)
}

async function _fetchArticles(path) {
  try {
    let response = await fetch(
      `${API_HOST}/${path}`,
      {
        METHOD: 'GET',
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en-US'
        }
      }
    )

    checkStatus(response);

    return response.json();
  } catch(e) {
    console.error('Request failed', e)
    return [];
  }

}

function checkStatus(response) {
  if (response.status >= 200 && response.status <= 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function encodeQueryObject(object) {
   let params = [];

   for (let i in object) {
     if(object[i])
       params.push(encodeURIComponent(i) + '=' + encodeURIComponent(object[i]));
   }
   return params.join('&');
}
