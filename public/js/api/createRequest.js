/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let newXHR = new XMLHttpRequest;
    
    newXHR.open(options.method, options.url, true);

    for (let key in options.headers) {
        newXHR.setRequestHeader(key, options.headers[key]);
    };

    if (options.responseType) {
        newXHR.responseType = options.responseType;
    };

    newXHR.onreadystatechange = function () {
        if(newXHR.readyState === XMLHttpRequest.DONE && newXHR.status === 200) {
            let responsed = JSON.parse(this.response);
            // console.log(responsed.success)
            if(responsed.success) {
                return options.callback(responsed.success, responsed.user)
            } else {
                return options.callback(responsed.success, responsed.error)
            }
        };
    };

    if (options.method === 'POST') {
        let formData = new FormData;
        for(let key in options.data) {
            formData.append(key, options.data[key]);
        };

        newXHR.send(formData);
        return newXHR
    } else {
        newXHR.send();
        return newXHR
    };
};