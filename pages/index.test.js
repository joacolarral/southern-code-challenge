import { render } from '@testing-library/react';
import Home from './index';

describe('Home', () => {
  let component;
  beforeEach(() => {
    component = render(<Home />);
  });
  it('renders the home', () => {
    expect(component).toBeTruthy();
  });
  it('renders a heading', () => {
    const { getByText } = component;
    const heading = getByText('Choose the rover to see the photo album');

    expect(heading);
  });
});
