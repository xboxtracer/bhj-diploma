/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    // console.log(element)
    super(element),
    this.renderAccountsList()
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    // console.log(this.element.querySelector('.accounts-select'))
    let accountsSelectElement = this.element.querySelector('.accounts-select');
    accountsSelectElement.innerHTML = ``;
    Account.list(User.current(), (response)=>{
      if(response.success) {
        for(let key of response.data) {
          // let option = document.createElement('option');
          // option.value = key.id;
          // accountsSelectElement.append(option);
          accountsSelectElement.innerHTML += `<option value="${key.id}">${key.name}</option>`;
        };
      };
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    console.log(options)
    Transaction.create( options , ( response ) => {
      // console.log(response)
      if (!response.success) {
        console.log(response);
      } else {
        App.modals.newIncome.close();
        App.update();
      }
    })

  }
}
