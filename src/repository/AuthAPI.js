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

export function getCurrentUser() {

    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: "GET"
    });
}

export function forgetPassword() {
    return request({
        url: API_BASE_URL + "/forgetpassword",
        method: "GET"
    })
}

export function sendMail() {
    return request({
        url: API_BASE_URL + "/sendmail",
        method: "GET"
    })
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: "POST",
        body: JSON.stringify(loginRequest)
    });
}

export async function signup(signupRequest) {

    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(signupRequest)
    })

    const json = response.json();
    if (!response.ok) return Promise.reject(json);
    return json;
}

export async function updateUser(userObject) {

    const headers = new Headers();
    if (localStorage.getItem(ACCESS_TOKEN)) {
        const auth = localStorage.getItem(ACCESS_TOKEN);
        const response = await fetch(`${API_BASE_URL}/user/`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${auth}`
            },
            body: userObject
        })

        const json = await response.json();

        if (response.status != 202) {
            return Promise.reject(json);
        }

        return json;
    } else {
        return Promise.reject(new Error("Bạn chưa đăng nhập!"));
    }

}