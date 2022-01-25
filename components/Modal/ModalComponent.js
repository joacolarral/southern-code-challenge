/* eslint-disable object-curly-newline */
import { Modal } from 'antd';
import { bool, node, func, string } from 'prop-types';

export default function ModalComponent(props) {
  const {
    handleOk,
    handleCancel,
    okText,
    cancelText,
    title,
    children,
    visible,
  } = props;

  return (
    <Modal
      visible={visible}
      title={title}
      onOk={handleOk}
      okText={okText}
      onCancel={handleCancel}
      cancelText={cancelText}
    >
      {children}
    </Modal>
  );
}

ModalComponent.propTypes = {
  handleOk: func,
  handleCancel: func,
  okText: string,
  cancelText: string,
  title: string,
  children: node,
  visible: bool,
};
ModalComponent.defaultProps = {
  handleOk: () => {},
  handleCancel: () => {},
  okText: 'Ok',
  cancelText: 'Cancel',
  title: 'Title',
  children: <div>Hello World</div>,
  visible: false,
};
