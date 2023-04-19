import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import { AppRoute } from '../../const';
import LoginScreen from './login-screen';
import userEvent from '@testing-library/user-event';


const mockStore = configureMockStore();
const store = mockStore({});

describe('Component: LoginScreen', () => {
  it('should render "LoginScreen" when user navigate to /login', async () => {
    const history = createMemoryHistory();
    history.push(AppRoute.Login);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <LoginScreen />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Sign in'})).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('email'), '111test@gmail.com');
    await userEvent.type(screen.getByTestId('password'), 'test111');

    expect(screen.getByDisplayValue(/111test@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/test111/i)).toBeInTheDocument();
  });
});
