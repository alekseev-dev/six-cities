import { render, screen } from '@testing-library/react';
import Star from './star';
import userEvent from '@testing-library/user-event';


describe('Component: Star', () => {
  it('should render correctly', async () => {
    const value = '5';
    const title = '5';
    const setRating = jest.fn();

    render(
      <Star
        value={value}
        title={title}
        setRating={setRating}
      />
    );

    expect(screen.getByTestId('star')).toBeInTheDocument();
    expect(screen.queryByTestId('star')).not.toBeChecked();

    await userEvent.click(screen.getByTestId('star'));

    expect(screen.getByTestId('star')).toBeChecked();
  });
});
