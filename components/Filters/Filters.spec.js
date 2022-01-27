/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
import moment from 'moment';
import { render, fireEvent } from '@testing-library/react';
import FilterComponent from './Filters';

describe('Filter component', () => {
  let props;
  let component;

  beforeEach(() => {
    props = {
      filterData: {
        max_sol: 3000,
        cameras: [
          { name: 'all', full_name: 'All Cameras' },
          { name: 'FHAZ', full_name: 'Front Hazard Avoidance Camera' },
          { name: 'NAVCAM', full_name: 'Navigation Camera' },
        ],
        max_date: '2022-06-11',
        rovers: [
          { name: 'curiosity', label: 'Curiosity' },
          { name: 'opportunity', label: 'Opportunity' },
          { name: 'spirit', label: 'Spirit' },
        ],
      },
      filtersChange: jest.fn(),
      filterState: {
        sol: 1,
        cameraName: 'all',
        roverName: 'curiosity',
        earthDate: moment('2022-01-22', 'YYYY-MM-DD'),
      },
      handleRoverNameChange: jest.fn(),
      handleFiltersChange: jest.fn(),
      changeAllFilterState: jest.fn(),
    };

    component = render(<FilterComponent {...props} />);
  });

  it('should render a basic FilterComponent', () => {
    expect(component);
  });

  it('should fire the handle rover change event when the dropdown change its value', () => {
    const { getByText } = component;
    fireEvent.mouseDown(getByText('Curiosity'));

    fireEvent.click(getByText('Opportunity'));

    expect(props.handleRoverNameChange).toHaveBeenCalledTimes(1);
  });

  it('should fire the handleFiltersChange event when inputs change its value', async () => {
    const { getByText, getByTestId } = component;
    fireEvent.mouseDown(getByText('All Cameras'));
    fireEvent.click(getByText('Navigation Camera'));

    const datePicker = getByTestId('date-picker-filter');
    fireEvent.mouseDown(datePicker);
    fireEvent.change(datePicker, { target: { value: '2018-01-20' } });
    fireEvent.click(document.querySelectorAll('.ant-picker-cell-selected')[0]);

    const switchComponent = document.querySelector('.switch-sol button');
    fireEvent.click(switchComponent);

    const inputNumber = getByTestId('input-number');
    fireEvent.change(inputNumber, { target: { value: 10 } });

    expect(props.handleFiltersChange).toHaveBeenCalledTimes(3);
  });

  it('should fire the filtersChange when apply changes', async () => {
    const { getByText } = component;
    fireEvent.click(getByText('Apply filters'));

    expect(props.filtersChange).toHaveBeenCalledTimes(1);
  });

  it('should open SaveFilterModal when clicking on Save Filters button', async () => {
    const { getByText, getByPlaceholderText } = component;
    fireEvent.click(getByText('Save filters'));

    const Modal = document.querySelector('.ant-modal');

    const inputSaveModal = getByPlaceholderText("Write filter's name...");
    expect(Modal).toBeInTheDocument();
    expect(inputSaveModal).toBeInTheDocument();
  });

  it('should open LoadFilterModal when clicking on Load Filters button', async () => {
    const { getByText } = component;
    fireEvent.click(getByText('Load filters'));

    const Modal = document.querySelector('.ant-modal');

    const listLoadComponent = document.querySelector('.ant-list');
    expect(Modal).toBeInTheDocument();
    expect(listLoadComponent).toBeInTheDocument();
  });
});
