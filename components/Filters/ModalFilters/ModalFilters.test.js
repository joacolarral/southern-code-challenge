/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
import moment from 'moment';
import { render, fireEvent } from '@testing-library/react';
import ModalFilter from './index';

describe('ModalFilter SaveFilters', () => {
  let props;
  let component;

  beforeEach(() => {
    props = {
      modalState: {
        visible: true,
        modalType: 'saveFilterModal',
      },
      changeAllFilters: jest.fn(),
      filterConfig: {
        sol: 1,
        cameraName: 'all',
        roverName: 'curiosity',
        earthDate: moment('2022-01-22', 'YYYY-MM-DD'),
      },
      setModalState: jest.fn(),
    };

    component = render(<ModalFilter {...props} />);
  });

  it('should render a basic ModalFilter with SaveComponent', () => {
    expect(component);
  });

  it('should close SaveFilterModal when clicking on Cancel', async () => {
    const { getByRole } = component;

    const buttonCancel = getByRole('button', { name: 'Cancel' });
    fireEvent.click(buttonCancel);

    expect(props.setModalState).toHaveBeenCalled();
  });

  it('should change input value when changing', async () => {
    const { getByPlaceholderText } = component;

    const input = getByPlaceholderText("Write filter's name...");
    fireEvent.change(input, { target: { value: 'new value' } });
    expect(input.value).toBe('new value');
  });

  it('should reset inputs value when clicking Save', async () => {
    const { getByPlaceholderText, getByRole } = component;

    const input = getByPlaceholderText("Write filter's name...");
    fireEvent.change(input, { target: { value: 'new value' } });

    const buttonSave = getByRole('button', { name: 'Save' });
    fireEvent.click(buttonSave);

    expect(input.value).toBe('');
    expect(props.setModalState).toHaveBeenCalled();
  });

  it('should not close the modal when clicking save and there is not value in the input', async () => {
    const { getByPlaceholderText, getByRole } = component;

    const input = getByPlaceholderText("Write filter's name...");
    fireEvent.change(input, { target: { value: '' } });

    const buttonSave = getByRole('button', { name: 'Save' });
    fireEvent.click(buttonSave);

    expect(input.value).toBe('');
    expect(props.setModalState).not.toHaveBeenCalled();
  });
});

describe('ModalFilter LoadComponent', () => {
  let props;
  let component;
  const filterStorage = [
    {
      config: {
        cameraName: 'all',
        sol: 1,
        roverName: 'opportunity',
        earthDate: '2018-06-11T03:00:00.000Z',
      },
      id: '5ab515fd-7e1f-42d4-a151-a4d3690e9f75',
      name: 'filter one',
    },
    {
      config: {
        cameraName: 'PANCAM',
        sol: 1,
        roverName: 'opportunity',
        earthDate: '2018-06-11T03:00:00.000Z',
      },
      id: 'f78df494-92a0-4ebc-9e85-81e18e231005',
      name: 'filter two',
    },
  ];
  beforeEach(() => {
    localStorage.setItem('filters', JSON.stringify(filterStorage));
    props = {
      modalState: {
        visible: true,
        modalType: 'loadFilterModal',
      },
      changeAllFilters: jest.fn(),
      filterConfig: {
        sol: 1,
        cameraName: 'all',
        roverName: 'curiosity',
        earthDate: moment('2022-01-22', 'YYYY-MM-DD'),
      },
      setModalState: jest.fn(),
    };

    component = render(<ModalFilter {...props} />);
  });

  it('should render a basic ModalFilter with LoadComponent', () => {
    expect(component);
  });

  it('should render the localStorage items', async () => {
    const { getByText } = component;

    expect(getByText('filter one'));
    expect(getByText('filter two'));
  });

  it('should select and item and send the config to load', async () => {
    const { getByText, getByRole } = component;

    const firstItem = getByText('filter one');
    fireEvent.click(firstItem);

    const loadButton = getByRole('button', { name: 'Load' });
    fireEvent.click(loadButton);

    expect(props.changeAllFilters).toHaveBeenCalled();
    expect(props.setModalState).toHaveBeenCalled();
  });

  it('should remove an item when clicking on delete button', async () => {
    const { getByText, getAllByRole } = component;

    const firstItem = getByText('filter one');
    fireEvent.click(firstItem);

    const deleteButton = getAllByRole('button', { name: 'Delete' })[0];
    fireEvent.click(deleteButton);

    expect(firstItem).not.toBeInTheDocument();
  });

  it('should close LoadFilterModal when clicking on Cancel', async () => {
    const { getByRole } = component;

    const buttonCancel = getByRole('button', { name: 'Cancel' });
    fireEvent.click(buttonCancel);

    expect(props.setModalState).toHaveBeenCalled();
  });

  it('should not close the modal when clicking Load and there is not selected item', async () => {
    const { getByRole } = component;

    const buttonLoad = getByRole('button', { name: 'Load' });
    fireEvent.click(buttonLoad);

    expect(props.setModalState).not.toHaveBeenCalled();
  });
});
