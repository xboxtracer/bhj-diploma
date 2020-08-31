/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    // console.log(element)
    this.element = element,
    this.registerEvents(),
    this.update()
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    this.element.querySelector('.create-account').addEventListener('click', ()=>{
      App.modals.createAccount.open();
    });
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    if(User.current()) {
      Account.list(User.current(), (response)=>{
        if(response.success) {
          this.clear();
          for(let key of response.data) {
            this.renderItem(key);
          }
        };
      });
    }

  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    let allListelem = this.element;
    while (allListelem.lastChild.classList == 'account') {
      allListelem.removeChild(allListelem.lastChild);
    };
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    let accountElement = element.parentElement.querySelectorAll('.account')
    for(let key of accountElement) {
      if(key.classList.contains('active')){
        key.classList.remove('active');
      };
    };
    element.classList.add('active');
    // console.log(element.dataset.id)
    App.showPage( 'transactions', { account_id: element.dataset.id });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML( item ) {
    // console.log(item)
    let listElement = document.createElement('li');
    listElement.classList.add('account');
    listElement.addEventListener('click', ()=>{
      this.onSelectAccount(listElement);
    });
    listElement.dataset.id = `${item.id}`;
    let innerLink = document.createElement('a');
    innerLink.setAttribute('href', '#');
    innerLink.innerHTML = `<span>${item.name}</span> / <span>${item.sum} ₽</span>`;
    listElement.append(innerLink);
    return listElement
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem( item ) {
    this.element.append(this.getAccountHTML(item));
  }
}
