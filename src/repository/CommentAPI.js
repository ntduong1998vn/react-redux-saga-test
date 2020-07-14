import {API_BASE_URL, ACCESS_TOKEN} from "../constants/auth";

const request = async options => {
    const headers = new Headers({
        "Content-Type": "application/json"
    });

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append(
            "Authorization",
            "Bearer " + localStorage.getItem(ACCESS_TOKEN)
        );
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    const response = await fetch(options.url, options);
    const json = await response.json();
    if (!response.ok) {
        return Promise.reject(json);
    }
    return json;
};

export function sendComment(commentForm) {
    return request({
        url: `${API_BASE_URL}/api/comment/`,
        method: "POST",
        body: JSON.stringify(commentForm)
    });
}

export function getCommentList(movieId, page) {
    return request({
        url: `${API_BASE_URL}/api/comment/${movieId}?page=${page}`,
        method: "GET",
    });
}

