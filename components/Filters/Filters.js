/* eslint-disable camelcase */
/* eslint-disable object-curly-newline */
import React from 'react';
import { Form, Row, Col, Button, Select, DatePicker, InputNumber } from 'antd';
import { arrayOf, number, string, shape, instanceOf, func } from 'prop-types';
import moment from 'moment';

const { Option } = Select;

export default function Filters(props) {
  const { filterData, filterState, filtersChange } = props;
  const { max_sol, cameras, max_date, rovers } = filterData;
  const [form] = Form.useForm();
  const onFinish = (values) => {
    filtersChange(values);
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form filter-component"
      onFinish={onFinish}
      initialValues={{
        ...filterState,
      }}
    >
      <Row gutter={24} justify="center">
        <Col span={4}>
          <Form.Item name="roverName" label="Rover">
            <Select
              value={filterState.roverName}
              defaultValue={filterState.roverName}
            >
              {rovers.map((rover) => (
                <Option key={rover.name} value={rover.name}>
                  {rover.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="cameraName" label="Camera">
            <Select placeholder="Select camera" value={filterState.cameraName}>
              {cameras.map((camera) => (
                <Option key={camera.name} value={camera.name}>
                  {camera.full_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="earthDate" label="Earth Day">
            <DatePicker
              disabledDate={(current) => current && current > moment(max_date)}
              defaultValue={filterState.earth_date}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name="sol" label="Sol">
            <InputNumber min={1} max={max_sol} value={filterState.sol} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit">
            Apply filters
          </Button>
        </Col>
      </Row>
    </Form>
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
};
