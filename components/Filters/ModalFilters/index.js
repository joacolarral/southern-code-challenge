/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import { bool, func, shape, string } from 'prop-types';
import LoadComponent from './LoadComponent';
import SaveComponent from './SaveComponent';

export default function ModalFilters(props) {
  const { modalState, setModalState, changeAllFilters, filterConfig } = props;

  const closeModal = () => {
    setModalState({ ...modalState, visible: false });
  };

  const modalTypeSelect = {
    loadFilterModal: (
      <LoadComponent
        visible={modalState.visible}
        handleModal={closeModal}
        changeAllFilters={changeAllFilters}
      />
    ),
    saveFilterModal: (
      <SaveComponent
        visible={modalState.visible}
        handleModal={closeModal}
        filterConfig={filterConfig}
      />
    ),
  };

  return modalTypeSelect[modalState.modalType];
}

ModalFilters.propTypes = {
  modalState: shape({
    visible: bool.isRequired,
    modalType: string.isRequired,
  }),
  setModalState: func,
  changeAllFilters: func.isRequired,
  filterConfig: shape({}).isRequired,
};

ModalFilters.defaultProps = {
  modalState: {
    visible: false,
    modalType: 'loadFilterModal',
  },
  setModalState: () => {},
};
