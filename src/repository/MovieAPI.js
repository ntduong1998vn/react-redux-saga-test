import {API_BASE_URL} from "../constants/auth";


const request = async options => {
    const headers = new Headers({
        "Content-Type": "application/json"
    });

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    const response = await fetch(options.url, options);
    const json = await response.json();
    if (!response.ok) {
        return Promise.reject(json);
    }
    return json;
};

export function getTopView() {
    return request({
        url: API_BASE_URL + "/api/movies/topview",
        method: "GET"
    });
}

export function getMovieListByGenreId(id, page) {
    return request({
        url: `${API_BASE_URL}/api/movies/genre?id=${id}&page=${page}&size=12`,
        method: "GET"
    })
}

export function getOneMovieById(id) {
    return request({
        url: `${API_BASE_URL}/api/movies/${id}`,
        method: "GET"
    })
}

export function findByTitle(keyword) {
    return request({
        url: `${API_BASE_URL}/api/movies/search?keyword=${keyword}`,
        method: "GET"
    })
}

export function findByLetterBegin(letter) {
    if (letter.includes('0-9')) {
        return request({
            url: `${API_BASE_URL}/api/movies/list`,
            method: 'GET'
        })
    } else {
        return request({
            url: `${API_BASE_URL}/api/movies/list?letter=${letter}`,
            method: 'GET'
        })
    }

}