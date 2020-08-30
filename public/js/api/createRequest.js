/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let newXHR = new XMLHttpRequest;
    

    for (let key in options.headers) {
        newXHR.setRequestHeader(key, options.headers[key]);
    };

    if (options.responseType) {
        newXHR.responseType = options.responseType;
    };

    newXHR.onreadystatechange = function () {
        if(newXHR.readyState === XMLHttpRequest.DONE && newXHR.status === 200) {
            // console.log(this.response);
            let responsed = this.response;
            return options.callback(responsed);
        };
    };


    if (options.method !== 'GET') {
        let formData = new FormData;
        for(let key in options.data) {
            // console.log(key, options.data[key])
            formData.append(key, options.data[key]);
        };
        // console.log(options.method)

        newXHR.open(options.method, options.url, true);
        newXHR.send(formData);
        return newXHR;
    } else {
        // console.log(options.data)
        let email = options.url + '?';
        for (let key in options.data) {
            email += `${key}=${options.data[key]}&`
        };
        newXHR.open(options.method, email, true);
        newXHR.send();
        return newXHR;
    };
};