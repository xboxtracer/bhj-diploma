/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    // console.log(element.querySelector('.content')[0])
    // if(!element.querySelector('.content')[0]) {
    //   throw 'Error'
    // }
    this.element = element,
    this.registerEvents()
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    // console.log(1)
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    // console.log(this.element.querySelectorAll('.btn-danger'))
    // this.element.querySelectorAll('.btn-danger').addEventListener('click', ()=>{
    //   console.log(1)
    // })
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {

  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ) {

  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render( options ) {
    Account.get(options.account_id, {name: User.current().name}, (response)=>{
      // console.log(response)
      if(response.success) {
        // console.log(response.data.name)
        this.renderTitle(response.data.name);
        Transaction.list({account_id: response.data.id}, (response)=>{
          // console.log(response.data)
          if(response.success) {
            this.clear();
            // let someData = [{
            //   "id": 12,
            //   "type": "expense",
            //   "name": "Новый будильник",
            //   "date": "2019-03-10 00:20:41",
            //   "sum": 200
            // }];
            this.renderTransactions(response.data);
          }
        })
      };
    })
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([])
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle( name ) {
    this.element.querySelector('.content-title').innerText = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate( date ) {
    let postDate = new Date(date)

    var month = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
    
    return `${postDate.getDate()} ${month[postDate.getMonth()]} ${postDate.getFullYear()} г. ${postDate.getHours()}:${postDate.getMinutes()}`
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML( item ) {
    // console.log(item);
    let divTransaction = document.createElement('div');
    divTransaction.classList.add('transaction');
    if(item.type === 'expense'){
      divTransaction.classList.add('transaction_expense');
    } else if(item.type === 'income'){
      divTransaction.classList.add('transaction_income');
    };
    divTransaction.innerHTML = `
    <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">${item.name}</h4>
          <!-- дата -->
          <div class="transaction__date">${this.formatDate(item.created_at)}</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">
      <!--  сумма -->
          ${item.sum} <span class="currency">₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">
        <!-- в data-id нужно поместить id -->
        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
        </button>
    </div>`;
    return divTransaction
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions( data ) {
    let contentDiv = this.element.querySelector('.content')
    if(data[0] === undefined) {
      while (contentDiv.firstChild) {
        contentDiv.removeChild(contentDiv.firstChild);
      };
    } else {
      for(let key of data) {
        contentDiv.append(this.getTransactionHTML(key));
      }
    }
  }
}
