
export function getLocal(key) {
    if (!localStorage.getItem(key)) {
        return null
    }
    if (localStorage.getItem(key)[0] == "[") {
        return JSON.parse((localStorage.getItem(key)));
    }
    if (localStorage.getItem(key)[0] != "{") {
        return localStorage.getItem(key)
    }

    return JSON.parse(localStorage.getItem(key));
}

export function setLocal(key, value) {
    if (typeof value == 'object') {
        localStorage.setItem(key, JSON.stringify(value));
    }
    else {
        localStorage.setItem(key, value);
    }

}

