/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable camelcase */
/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import {
  Row,
  Col,
  Button,
  Select,
  DatePicker,
  InputNumber,
  Switch,
} from 'antd';
import { arrayOf, number, string, shape, instanceOf, func } from 'prop-types';
import moment from 'moment';
import ModalFilters from './ModalFilters';

const { Option } = Select;

export default function Filters(props) {
  const {
    filterData,
    filterState,
    filtersChange,
    handleRoverNameChange,
    handleFiltersChange,
    changeAllFilterState,
  } = props;
  const { max_sol, cameras, max_date, rovers } = filterData;
  const [checked, setChecked] = useState(false);
  const [modalState, setModalState] = useState({
    visible: false,
    modalType: 'loadFilterModal',
  });
  const applyChanges = () => {
    filtersChange(checked);
  };

  const handleChange = (name, value) => {
    handleFiltersChange(name, value);
  };

  const handleOpenModal = (modalType) => {
    setModalState({
      visible: true,
      modalType,
    });
  };

  return (
    <div className="filter-component">
      <Row gutter={24} justify="center">
        <Col span={4}>
          <div className="filter-container">
            <label>Rover: </label>
            <Select
              value={filterState.roverName}
              onChange={handleRoverNameChange}
              className="filter-flex"
            >
              {rovers.map((rover) => (
                <Option key={rover.name} value={rover.name}>
                  {rover.label}
                </Option>
              ))}
            </Select>
          </div>
        </Col>
        <Col span={5}>
          <div className="filter-container">
            <label>Camera: </label>
            <Select
              value={filterState.cameraName}
              onChange={(value) => handleChange('cameraName', value)}
              className="filter-flex"
            >
              <Option value="all">All Cameras</Option>
              {cameras.map((camera) => (
                <Option key={camera.name} value={camera.name}>
                  {camera.full_name}
                </Option>
              ))}
            </Select>
          </div>
        </Col>
        <Col>
          <div className="switch-sol">
            <Switch
              checked={checked}
              checkedChildren="Sol"
              unCheckedChildren="Date"
              onChange={(checkedValue) => setChecked(checkedValue)}
            />
          </div>
        </Col>
        {!checked ? (
          <Col span={4}>
            <div className="filter-container">
              <label>Earth Date: </label>
              <DatePicker
                data-testid="date-picker-filter"
                allowClear={false}
                disabledDate={(current) =>
                  current && current > moment(max_date)
                }
                onChange={(value) => handleChange('earthDate', value)}
                value={filterState.earthDate}
                format="YYYY-MM-DD"
              />
            </div>
          </Col>
        ) : (
          <Col span={4}>
            <div className="filter-container">
              <label>Sol: </label>
              <InputNumber
                data-testid="input-number"
                min={1}
                max={max_sol}
                value={filterState.sol}
                onChange={(value) => handleChange('sol', value)}
              />
            </div>
          </Col>
        )}
        <Col span={2}>
          <div className="filter-container">
            <Button type="primary" htmlType="submit" onClick={applyChanges}>
              Apply filters
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'center' }}>
          <div className="filter-buttons">
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => handleOpenModal('saveFilterModal')}
            >
              Save filters
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => handleOpenModal('loadFilterModal')}
            >
              Load filters
            </Button>
          </div>
        </Col>
      </Row>
      <ModalFilters
        changeAllFilters={changeAllFilterState}
        modalState={modalState}
        filterConfig={filterState}
        setModalState={setModalState}
      />
    </div>
  );
}

Filters.propTypes = {
  filterData: shape({
    max_sol: number.isRequired,
    cameras: arrayOf(shape({})).isRequired,
    max_date: string.isRequired,
    rovers: arrayOf(shape({})).isRequired,
  }).isRequired,
  filtersChange: func.isRequired,
  filterState: shape({
    sol: number,
    cameraName: string,
    roverName: string,
    earthDate: instanceOf(Date),
  }).isRequired,
  handleRoverNameChange: func.isRequired,
  handleFiltersChange: func.isRequired,
  changeAllFilterState: func.isRequired,
};
