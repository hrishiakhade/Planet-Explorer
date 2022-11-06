
const NASA_API_KEY = 'VXMLiST13HsvdHcoSo4acwW79riQ0nJGlEbVDKY5';

const options = {                         // This is the object that contains the API key for the Planets API
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '78286fbbd8msh2ce1518451963bap1d4708jsnbd559de32a1c',
        'X-RapidAPI-Host': 'planets-info-by-newbapi.p.rapidapi.com'
    }
};

export function getNasaAPOD() {
    return new Promise((resolve, reject) => {
        fetch('https://api.nasa.gov/planetary/apod?api_key=' + NASA_API_KEY)
            .then(response => response.json())
            .then(results => {
                resolve(results)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function getSpaceNews(pageSize = 10, pageNo = 0) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=${pageSize}&_start=${pageNo * pageSize}`)
            .then(response => response.json())
            .then(results => {
                resolve(results)
            })
            .catch(error => {
                reject(error)
            })
    })
}



//https://images-api.nasa.gov/search?q=apollo &media_type=image

// get thumb image from  links[0].href
// get original media from  items[0].href[0]


export function getNASAMedia(searchKey, pageNo = 1) {
    return new Promise((resolve, reject) => {
        fetch(`https://images-api.nasa.gov/search?title=${searchKey}&page=${pageNo}&media_type=image`)
            .then(response => response.json())
            .then(results => {
                resolve(results)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function getNASAMediaFromJSON(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(results => {
                resolve(results)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function fetchPlanetsInfo() {
    return new Promise((resolve, reject) => {
        fetch('https://planets-info-by-newbapi.p.rapidapi.com/api/v1/planet/list', options)
            .then(response => response.json())
            .then(response => {
                resolve(response?.sort((a, b) => { return a.planetOrder - b.planetOrder }));
            })
            .catch(error => reject(error));
    })
}