import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';


function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<AuthData>({
    email: '',
    password: '',
  });

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(loginAction(formData));
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  const isPassValid = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.validity.patternMismatch) {
      evt.target.setCustomValidity('Пароль должен состоять минимум из одной буквы и цифры');
    } else {
      evt.target.setCustomValidity('');
    }
  };

  const checkForAtleastOneCharacterAndNumber = '^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$';

  return (
    <form
      onSubmit={handleSubmit}
      className="login__form form"
      action="#"
      method="post"
    >
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden" htmlFor="email">E-mail</label>
        <input
          onChange={handleInputChange}
          value={formData.email}
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          id="email"
          required
          data-testid='email'
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden" htmlFor="password">Password</label>
        <input
          onChange={(evt) => {
            handleInputChange(evt);
            isPassValid(evt);
          }}
          value={formData.password}
          pattern={checkForAtleastOneCharacterAndNumber}
          className="login__input form__input"
          type="password" name="password"
          placeholder="Password"
          id="password"
          required
          data-testid='password'
        />
      </div>
      <button
        className="login__submit form__submit button"
        type="submit"
        data-testid='sign-in'
      >
      Sign in
      </button>
    </form>
  );
}

export default LoginForm;

