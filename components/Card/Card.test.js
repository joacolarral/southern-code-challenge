/* eslint-disable react/jsx-props-no-spreading */
import { render } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  let component;
  const mock = {
    imgUrl: 'path-to-url',
    metadata: {
      cameraData: {
        id: 1,
        name: 'FHAZ',
        rover_id: 2,
        full_name: 'Front Hazard Avoidance Camera',
      },
      earthDate: '2020/01/01',
      roverData: {
        id: 2,
        name: 'Curiosity',
        landing_date: '2020/01/01',
        launch_date: '2020/01/01',
        status: 'active',
      },
    },
  };
  beforeEach(() => {
    component = render(<Card {...mock} />);
  });
  it('renders the Card', () => {
    expect(component).toBeTruthy();
  });
  it('renders all the data', () => {
    const { getByText, getAllByText } = component;

    expect(getAllByText('2020/01/01')).toHaveLength(3);
    expect(getByText('Curiosity'));
  });
});
