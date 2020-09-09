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
    // console.log(element)
    this.element = element,
    this.registerEvents()
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    // this.render({account_id: User.current().id})
    let accountId = document.querySelector('li.active');
    if (accountId) {
      // console.log(accountId.dataset.id);
      this.render({account_id: accountId.dataset.id})
    }
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    let buttonRemove = this.element.querySelectorAll('.transaction__remove');
    for(let key of buttonRemove) {
        key.addEventListener('click', ()=>{this.removeTransaction(key.dataset.id)});
    };

    if (!this.element.querySelector('.remove-account').dataset.listener) {
      this.element.querySelector('.remove-account').addEventListener('click', ()=>{this.removeAccount()});
      this.element.querySelector('.remove-account').dataset.listener = true;
    }
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
    let confirmDeleteAccount = confirm();
    if(confirmDeleteAccount){
      let activeAccount = document.querySelector('li.active').dataset.id;
      Account.remove(activeAccount, {}, (response)=>{
        console.log(response)
        if(response.success){
          this.clear();
          App.update();
        }
      });
    }
    this.clear();
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ) {
    console.log(id)
    let confirmDeleteTransaction = confirm();
    if(confirmDeleteTransaction){
      Transaction.remove(id, {}, (response)=>{
        if(response.success){
          this.clear();
          App.updatePages();
        }
      });
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render( options ) {
    // console.log(options)
    Account.get(options.account_id, {name: User.current().name}, (response)=>{
      // console.log(response)
      if(response.success) {
        // console.log(response.data.name)
        Transaction.list({account_id: response.data.id}, (responseList)=>{
          // console.log(responseList.data)
          if(responseList.success) {
            this.clear();
            this.renderTitle(response.data.name);
            this.renderTransactions(responseList.data);
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
    this.renderTitle('Название счёта');
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
    if(item.type.toLowerCase() === 'expense'){
      divTransaction.classList.add('transaction_expense');
    } else if(item.type.toLowerCase() === 'income'){
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
      this.registerEvents();
    }
  }
}
