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

export function getGenresAll() {
    return request({
        url: API_BASE_URL + "/api/genres/",
        method: "GET",
    });
}

