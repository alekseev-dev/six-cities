import { configureMockStore } from '@jedmao/redux-mock-store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import { redirect } from '../../store/middlewares/redirect';
import { rootState } from '../../types/state';
import LoginForm from './login-form';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api), redirect];

type ActionType = {
  payload: undefined;
  type: string;
  meta: {
    arg: {
      email: string;
      password: string;
    };
    requestId: string;
    requestStatus: string;
  };
}

const mockStore = configureMockStore<
rootState,
ActionType,
ThunkDispatch<rootState, typeof api, ActionType>
>(middlewares);

const store = mockStore({});

describe('Component: LoginForm', () => {
  it('should correctly render', async () => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Sign in'})).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('email'), '111test@gmail.com');
    await userEvent.type(screen.getByTestId('password'), 'test111');

    expect(screen.getByDisplayValue(/111test@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/test111/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', {name: 'Sign in'}));

    const actions = store.getActions()[0].meta.arg;

    expect(actions).toEqual({email: '111test@gmail.com', password: 'test111'});
  });
});
