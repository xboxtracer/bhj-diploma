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
            console.log(this.response);
            let responsed = this.response;
            if(responsed.success) {
                return options.callback(responsed.success, responsed.user);
            } else {
                return options.callback(responsed.success, responsed.error);
            };
        };
    };


    if (options.method !== 'GET') {
        let formData = new FormData;
        for(let key in options.data) {
            formData.append(key, options.data[key]);
        };

        newXHR.open(options.method, options.url, true);
        newXHR.send(formData);
        return newXHR;
    } else {
        let email = options.url + '?';
        for (let key in options.data) {
            email += `${key}=${options.data[key]}&`
        };
        newXHR.open(options.method, email, true);
        newXHR.send();
        return newXHR;
    };
};