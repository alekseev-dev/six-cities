import { render, screen } from '@testing-library/react';
import { makeFakeComment } from '../../../utils/mocks';
import ReviewItem from './reviews-item';

const mockReview = makeFakeComment({comment: 'test comment'});

describe('Component: ReviewItem', () => {
  it('should render correctly', () => {
    render(
      <ReviewItem
        review={mockReview}
      />
    );

    expect(screen.getByAltText(/Reviews avatar/i)).toBeInTheDocument();
    expect(screen.getByText('test comment')).toBeInTheDocument();
  });
});
