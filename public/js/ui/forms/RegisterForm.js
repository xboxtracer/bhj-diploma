/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
    User.register(options, (response ) => {
      if (response.error) {
        console.log(response.error);
      } else {
        User.setCurrent(response.user);
        App.setState( 'user-logged' );
        App.modals.register.close();
      }
    });
  }
}
