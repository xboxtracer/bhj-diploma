/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {

  static URL = '';
  // constructor(url = '') {
  //   this.URL = url
  // }

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback = f => f ) {
    return createRequest({
      url: this.URL,
      data: data,
      method: 'GET',
      callback: callback
    })
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f ) {
    return createRequest({
      url: this.URL,
      data: data,
      method: 'POST',
      callback: callback
    })

  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f ) {
    data._method = 'PUT'
    console.log(data)
    return createRequest({
      url: this.URL + '/' + id,
      data: data,
      method: 'GET',
      responseType: 'json',
      callback: callback
    })
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f ) {
    return createRequest({
      url: this.URL + '/' + id,
      data: data,
      method: 'POST',
      callback: callback
    })
  }
};

// Entity.URL = '';

// console.log( Entity.URL );
// let some = new Entity;
// console.log(some)
