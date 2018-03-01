import { shallow } from 'enzyme';
import React from 'react';
import ReactModal from 'react-modal';
import Modal from './index';

function setup(overrides) {
  const defaultProps = {
    contentLabel: 'test',
    isOpen: false,
    onClose: jest.fn()
  };
  const props = { ...defaultProps, ...overrides };
  const wrapper = shallow(
    <Modal {...props}>
      <div className="child">hi</div>
    </Modal>
  );
  return {
    wrapper,
    props
  };
}

describe('<Modal>', () => {
  it('should render', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });

  it('should render its children', () => {
    const { wrapper } = setup();
    expect(wrapper.find('.child').exists()).toBe(true);
  });

  it('should pass props.contentLabel to the react-modal component', () => {
    const { wrapper, props } = setup();
    expect(wrapper.find(ReactModal).prop('contentLabel')).toEqual(
      props.contentLabel
    );
  });

  it('should set state.isOpen to false when the close button is clicked', () => {
    const { wrapper } = setup({ isOpen: true });
    wrapper.find('Button').simulate('click');
    expect(wrapper.state('isOpen')).toEqual(false);
  });

  it('should call ReactModal.setAppElement before mount', () => {
    ReactModal.setAppElement = jest.fn();
    const { wrapper } = setup();
    wrapper.instance().componentWillMount();
    expect(ReactModal.setAppElement).toHaveBeenCalledWith('body');
  });

  describe('close', () => {
    it('should set state.isOpen to false', () => {
      const { wrapper } = setup({ isOpen: true });
      expect(wrapper.state('isOpen')).toEqual(true);
      wrapper.instance().close();
      expect(wrapper.state('isOpen')).toEqual(false);
    });

    it('should call props.onClose', () => {
      const { wrapper, props } = setup();
      wrapper.instance().close();
      expect(props.onClose).toHaveBeenCalled();
    });
  });
});
