import { render } from '@testing-library/react';
import Banner from './Banner';

describe('Banner tests', () => {
  let component;
  beforeEach(() => {
    component = render(<Banner />);
  });
  it('renders the Banner', () => {
    expect(component).toBeTruthy();
  });
  it('renders a heading', () => {
    const { getByText } = component;
    const heading = getByText('Welcome to DATA MARS');

    expect(heading);
  });
});
