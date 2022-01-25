/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import { Input } from 'antd';
import { bool, func, shape } from 'prop-types';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Modal from '../../Modal/ModalComponent';

export default function SaveComponent(props) {
  const { visible, handleModal, filterConfig } = props;
  const [filterName, setFilterName] = useState('');

  const saveFilters = () => {
    const filtersStorage = localStorage.getItem('filters');
    const newFilterName = {
      id: uuidv4(),
      name: filterName,
      config: filterConfig,
    };
    if (!filtersStorage || !JSON.parse(filtersStorage).length) {
      localStorage.setItem('filters', JSON.stringify([newFilterName]));
      handleModal();
      return setFilterName('');
    }

    localStorage.setItem(
      'filters',
      JSON.stringify([...JSON.parse(filtersStorage), newFilterName])
    );
    handleModal();
    return setFilterName('');
  };

  const handleCancel = () => {
    handleModal();
  };

  const modalSave = {
    handleOk: saveFilters,
    handleCancel,
    okText: 'Save',
    title: 'Save Filters',
    visible,
  };

  const handleChange = (e) => {
    setFilterName(e.target.value);
  };

  return (
    <Modal {...modalSave}>
      <Input
        placeholder="Write filter's name..."
        value={filterName}
        onChange={handleChange}
      />
    </Modal>
  );
}

SaveComponent.propTypes = {
  handleModal: func.isRequired,
  visible: bool.isRequired,
  filterConfig: shape.isRequired,
};
