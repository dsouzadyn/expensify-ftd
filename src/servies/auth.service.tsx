import * as qs from "querystring";

export const fetchToken = async (username: string, password: string) => {
    const response = await fetch("http://127.0.0.1:8000/login", {
        method: 'POST', headers: {
            //'Content-Type': 'application/json'
            'Content-Type': 'application/x-www-form-urlencoded',
        }, body: qs.stringify({
            username: username,
            password: password
        })
    });
    return response.json();
}

export const registerUser = async (username: string, password: string) => {
    const response = await fetch("http://127.0.0.1:8000/login", {
        method: 'POST', headers: {
            //'Content-Type': 'application/json'
            'Content-Type': 'application/json',
        }, body: qs.stringify({
            email: username,
            password: password
        })
    });
    return response.json();
}