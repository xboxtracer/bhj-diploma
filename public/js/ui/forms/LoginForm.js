/**
 * Класс LoginForm управляет формой
 * входа в портал
 * Наследуется от AsyncForm
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
    User.login(options, ( err, response ) => {
      // console.log(err, response)
      if (!err) {
        console.log(response);
      } else {
        User.setCurrent(response);
        App.setState( 'user-logged' );
        App.modals.login.close();
      }
    });
  }
}
