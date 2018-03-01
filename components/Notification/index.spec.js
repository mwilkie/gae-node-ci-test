import { shallow } from 'enzyme';
import React from 'react';
import { Notification } from './index';

function setup(overrides) {
  const defaultProps = {
    clearNotification: jest.fn(),
    content: 'this is a notification',
    id: 1
  };
  const props = { ...defaultProps, ...overrides };
  const wrapper = shallow(<Notification {...props} />);
  return {
    wrapper,
    props
  };
}

describe('<Notification>', () => {
  it('should render', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });

  it('should call props.clearNotification', () => {
    const { wrapper, props } = setup();
    wrapper.find('Button').simulate('click', { preventDefault: jest.fn() });
    expect(props.clearNotification).toHaveBeenCalledWith(props.id);
  });

  describe('componentDidMount', () => {
    it('should call setTimeout', () => {
      const { wrapper } = setup();
      window.setTimeout = jest.fn();
      wrapper.instance().componentDidMount();
      expect(window.setTimeout).toHaveBeenCalled();
    });
  });

  describe('componentWillUnmount', () => {
    it('should call clearTimeout', () => {
      const { wrapper } = setup();
      window.clearTimeout = jest.fn();
      wrapper.instance().componentWillUnmount();
      expect(window.clearTimeout).toHaveBeenCalled();
    });
  });
});
