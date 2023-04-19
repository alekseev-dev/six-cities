import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { address, datatype } from 'faker';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { CitiesNames, NameSpace, SortType } from '../../const';
import { makeFakeOffers } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import Map from './Map';

const mockStore = configureMockStore();
const mockOffers = makeFakeOffers();
const mockActiveOfferCard = {
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: datatype.number({min: 5, max: 20}),
  },
  id: 1,
};

const store = mockStore({
  [NameSpace.Data]: {
    offerList: mockOffers,
    currentSortType: SortType.Popular,
  },
  [NameSpace.App]: {
    currentCity: CitiesNames.Paris,
    activeOfferCard: mockActiveOfferCard,
  },
});

const history = createMemoryHistory();

describe('Component: Map', () => {
  it('should render correctly with activeOfferCard', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Map
            offers={mockOffers}
          />
        </HistoryRouter>
      </Provider>
    );

    const commonLengthOfMarkers = mockOffers.length + Number(Boolean(mockActiveOfferCard));

    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getAllByAltText(/Marker/i)).toHaveLength(commonLengthOfMarkers);
  });
});
