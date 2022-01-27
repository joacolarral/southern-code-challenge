/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable arrow-body-style */
import { List, Button } from 'antd';
import moment from 'moment';
import { bool, func } from 'prop-types';
import { useEffect, useState } from 'react';
import Modal from '../../Modal/ModalComponent';

export default function LoadComponent(props) {
  const { changeAllFilters, handleModal, visible } = props;
  const [dataLoad, setDataLoad] = useState([]);
  const [filterNameSelected, setFilterNameSelected] = useState(0);

  useEffect(() => {
    const filtersStorage = localStorage.getItem('filters');
    if (!filtersStorage) return setDataLoad([]);
    return setDataLoad(JSON.parse(filtersStorage));
  }, []);

  const handleCancel = () => {
    setFilterNameSelected(0);
    handleModal();
  };

  const handleLoad = () => {
    if (!filterNameSelected) return;

    const configExits = dataLoad.find((d) => d.id === filterNameSelected);

    if (!configExits) return handleCancel();

    const configToLoad = configExits.config;
    changeAllFilters({
      ...configToLoad,
      earthDate: moment(configToLoad.earthDate, 'YYYY/MM/DD'),
    });
    handleModal();
  };

  const onSelect = (id) => {
    setFilterNameSelected(id);
  };

  const modalLoad = {
    handleOk: handleLoad,
    handleCancel,
    okText: 'Load',
    title: 'Load Filters',
    visible,
  };

  const handleRemove = (id) => {
    const filterNameRemoved = dataLoad.filter((filter) => {
      return filter.id !== id;
    });
    setDataLoad(filterNameRemoved);
    return localStorage.setItem('filters', JSON.stringify(filterNameRemoved));
  };

  return (
    <Modal {...modalLoad}>
      <List
        size="large"
        bordered
        dataSource={dataLoad}
        renderItem={(item) => (
          <List.Item
            className="select-load-filter"
            style={{
              background: filterNameSelected === item.id && 'aquamarine',
            }}
            onClick={() => onSelect(item.id)}
            key={item.id}
            actions={[
              <Button onClick={() => handleRemove(item.id)} danger>
                Delete
              </Button>,
            ]}
          >
            {item.name}
          </List.Item>
        )}
      />
    </Modal>
  );
}

LoadComponent.propTypes = {
  handleModal: func.isRequired,
  changeAllFilters: func.isRequired,
  visible: bool.isRequired,
};
