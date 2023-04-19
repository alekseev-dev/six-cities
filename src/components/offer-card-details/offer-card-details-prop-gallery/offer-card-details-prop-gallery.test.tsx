import { render, screen } from '@testing-library/react';
import { makeFakeOffer } from '../../../utils/mocks';
import OfferCardDetailsPropGallery from './offer-card-details-prop-gallery';

const {images} = makeFakeOffer();

describe('Component: OfferCardDetailsPropGallery', () => {
  it('should render correctly', () => {
    render(
      <OfferCardDetailsPropGallery
        images={images}
      />
    );

    expect(screen.getAllByAltText('Photo studio')[0]).toBeInTheDocument();
    expect(screen.getAllByAltText('Photo studio')).toHaveLength(6);
  });
});
