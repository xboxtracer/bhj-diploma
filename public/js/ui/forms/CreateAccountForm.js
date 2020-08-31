/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * Наследуется от AsyncForm
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно (в котором находится форма) в случае успеха,
   * а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit( options ) {
    // console.log(options)
    Account.create(options, ( response ) => {
      // console.log(err, response)
      if (response.error) {
        console.log(response);
      } else {
        App.modals.createAccount.close();
        App.update();
      }
    });
  }
}
